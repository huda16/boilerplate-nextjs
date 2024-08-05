import { ForwardRefRenderFunction, forwardRef } from "react";

import Link from "next/link";

interface LinkBehaviourProps
  extends React.ComponentPropsWithoutRef<typeof Link> {}

const LinkBehaviourComponent: ForwardRefRenderFunction<
  HTMLAnchorElement,
  LinkBehaviourProps
> = (props, ref) => {
  return <Link ref={ref} {...props} />;
};

export const LinkBehaviour = forwardRef(LinkBehaviourComponent);
