import { ComponentProps, FC, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

export const Fade: FC<ComponentProps<"div">> = ({ className, children }) => {
  const [expand, setExpand] = useState(false);
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={expand}
      onEnter={() => setExpand(true)}
      onExit={() => setExpand(false)}
      timeout={300}
      classNames={{
        enter: "animate__animated animate__fadeIn",
        exit: "animate__animated animate__fadeOut",
      }}
      mountOnEnter
      unmountOnExit
    >
      <div ref={nodeRef} className={className}>
        {children}
      </div>
    </CSSTransition>
  );
};
