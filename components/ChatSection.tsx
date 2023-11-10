import type { FC } from "react"
import React, { useRef, useState } from "react"
import Textarea from "react-textarea-autosize"
import { z } from "zod"

import { cn } from "~lib/utils"
import { messageValidator } from "~lib/validators"

import { Button } from "./ui/Button"
import { IconPlus, IconSendMessage, IconUser } from "./ui/icons"
import { ScrollArea } from "./ui/ScrollArea"

type Message = {
  creator: "AI" | "USER"
  text: string[]
}

const ChatSection = ({}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>("")
  const [isLoading, setLoading] = useState<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const sendMessage = async () => {
    if (!input) return
    setLoading(true)
    setMessages((prev) => [...prev, { creator: "USER", text: [input] }])
    bottomRef?.current?.scrollIntoView()
    try {
      const payload = messageValidator.parse({
        prompt: input
      })
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      setMessages((prev) => [...prev, { creator: "AI", text: [] }])
      const reader = response.body.getReader()
      while (true) {
        const { value, done } = await reader.read()
        if (done) {
          console.log("done")
          break
        }
        const text = new TextDecoder().decode(value)
        setMessages((prev) =>
          prev.map((message, idx) =>
            idx === prev.length - 1
              ? { ...message, text: [...message.text, text] }
              : message
          )
        )
        if (text.endsWith("\n")) {
          setMessages((prev) => [...prev, { creator: "AI", text: [] }])
        }
        bottomRef?.current?.scrollIntoView()
      }
      textareaRef.current?.focus()
      bottomRef?.current?.scrollIntoView()
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error({ message: error.message })
        return
      }

      console.error("message", error)
    } finally {
      setLoading(false)
      setInput("")
    }
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <div className="w-full flex-1 justify-between flex flex-col h-[calc(100vh-100px)]">
        <ScrollArea
          id="messages"
          className="flex h-full flex-1 flex-col justify-end px-4">
          <div className="flex justify-center bg-opacity-20 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] mb-3 ">
            <span className="text-sm font-semibold text-gray-700">
              AI Chatbot By Ravi
            </span>
          </div>
          {messages.map((message: Message, index: number) => {
            const isPrompt = message.creator === "USER"

            const hasNextMessageFromSameUser =
              messages[index + 1]?.creator === messages[index].creator

            return (
              <div className="mb-3" key={index}>
                <div
                  className={cn("flex items-end", {
                    "justify-end": isPrompt
                  })}>
                  <div
                    className={cn(
                      "flex flex-col space-y-2 text-base max-w-xs mx-2",
                      {
                        "order-1 items-end": isPrompt,
                        "order-2 items-start": !isPrompt
                      }
                    )}>
                    <span
                      className={cn("px-4 py-2 rounded-lg inline-block", {
                        "bg-gray-600 text-gray-200": isPrompt,
                        "bg-primary text-primary-foreground": !isPrompt,
                        "rounded-br-none":
                          !hasNextMessageFromSameUser && isPrompt,
                        "rounded-bl-none":
                          !hasNextMessageFromSameUser && !isPrompt
                      })}>
                      <p className="md:text-md text-base">{...message.text} </p>
                    </span>
                  </div>

                  <div
                    className={cn("relative w-8 h-8", {
                      "order-2": isPrompt,
                      "order-1": !isPrompt,
                      invisible: hasNextMessageFromSameUser
                    })}>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      size="icon"
                      disabled>
                      {isPrompt ? <IconUser></IconUser> : "AI"}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={bottomRef} />
        </ScrollArea>
        {/* <div className="bottom-0" ref={bottomRef} /> */}
      </div>
      <div className="fixed inset-x-0 bottom-0">
        <div className="mx-auto border-t px-4 py-2 shadow-sm border">
          <div className="relative flex items-center max-h-60 w-full overflow-hidden bg-background pr-8">
            <Textarea
              ref={textareaRef}
              tabIndex={0}
              onKeyDown={onKeyDown}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message."
              spellCheck={false}
              className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none text-base"
            />
            <div className="absolute right-0 top-4 sm:right-4">
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || input === ""}
                onClick={sendMessage}>
                <IconSendMessage className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatSection
