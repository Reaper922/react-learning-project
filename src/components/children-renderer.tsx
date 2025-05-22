import type { PropsWithChildren } from "react";

// Children sind html was in die Component reingereicht wird
function ChildrenRenderer({ children }: PropsWithChildren) {
  return (
    <>
      <h1>Hello Children</h1>
      {children}
      <h1>Bye Children</h1>
    </>
  );
}

export default ChildrenRenderer;
