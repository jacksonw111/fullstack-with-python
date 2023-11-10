import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useLocation, useOutlet } from "react-router-dom";
import { createRef } from "react";
export const Layout = () => {
  const currentOutlet = useOutlet();
  const location = useLocation();
  const nodeRef: any = createRef();
  return (
    <div>
      <div className="animate__animated animate__backInRight">
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
            {() => <div ref={nodeRef}>{currentOutlet}</div>}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};
