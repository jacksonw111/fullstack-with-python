import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useLocation, useOutlet } from "react-router-dom";
import { createRef } from "react";

export const LayoutContent = () => {
  const currentOutlet = useOutlet();
  const location = useLocation();
  const nodeRef: any = createRef();
  return (
    <div className="animate__animated animate__backInRight h-full w-full">
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={nodeRef}
          timeout={800}
          classNames={{
            enter: "animate__animated animate__backInRight",
            exit: "animate__animated animate__fadeOut",
          }}
          unmountOnExit
        >
          {() => (
            <div className="w-full h-full " ref={nodeRef}>
              {currentOutlet}
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};
