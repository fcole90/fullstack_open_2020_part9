interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({name}) => (
  <h1>{name}</h1>
)

export default Header