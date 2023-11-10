import { cn } from "~lib/utils"

function IconSendMessage({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="256px"
      height="256px"
      viewBox="0 0 28 28"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="#000000"
      transform="matrix(1, 0, 0, 1, 0, 0)"
      className={cn("h-4 w-4", className)}
      {...props}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="0.05600000000000001"></g>
      <g id="SVGRepo_iconCarrier">
        <g
          id="🔍-Product-Icons"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd">
          {" "}
          <g id="ic_fluent_send_28_regular" fill="#212121" fillRule="nonzero">
            {" "}
            <path
              d="M3.78963301,2.77233335 L24.8609339,12.8499121 C25.4837277,13.1477699 25.7471402,13.8941055 25.4492823,14.5168992 C25.326107,14.7744476 25.1184823,14.9820723 24.8609339,15.1052476 L3.78963301,25.1828263 C3.16683929,25.4806842 2.42050372,25.2172716 2.12264586,24.5944779 C1.99321184,24.3238431 1.96542524,24.015685 2.04435886,23.7262618 L4.7030903,13.9775798 L2.04435886,4.22889788 C1.8627142,3.56286745 2.25538645,2.87569101 2.92141688,2.69404635 C3.21084015,2.61511273 3.51899823,2.64289932 3.78963301,2.77233335 Z M3.63522914,4.36121177 L6.058,13.249 L17,13.25 C17.3796958,13.25 17.693491,13.5321539 17.7431534,13.8982294 L17.75,14 C17.75,14.3796958 17.4678461,14.693491 17.1017706,14.7431534 L17,14.75 L6.046,14.749 L3.63522914,23.5939479 L23.7421805,13.9775798 L3.63522914,4.36121177 Z"
              id="🎨-Color">
              {" "}
            </path>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  )
}

function IconPlus({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}>
      <path d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z" />
    </svg>
  )
}
function IconUser({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z" />
    </svg>
  );
}

export { IconPlus, IconUser, IconSendMessage }
