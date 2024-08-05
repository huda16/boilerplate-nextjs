type IconProps = {
  children: string;
};

export function Icon({ children }: IconProps) {
  return <span className="material-symbols-outlined">{children}</span>;
}
