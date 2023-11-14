import { ComponentType } from "react";
import { HiRocketLaunch } from "react-icons/hi2";

function withInitialComponent<T extends object>(
  WrappedComponent: ComponentType<T>
) {
  return (props: T & { isLoading: boolean }) => {
    const { isLoading } = props;
    if (isLoading)
      return (
        <div className="w-full h-full">
          <HiRocketLaunch className="animate-bounce" />;
        </div>
      );
    return <WrappedComponent {...props} />;
  };
}

export default withInitialComponent;
