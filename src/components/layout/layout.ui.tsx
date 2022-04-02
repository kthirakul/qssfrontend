import { sidebar } from './layout.styles'

const layout: React.FC = ({ children }) => {
  return <div style={sidebar}>{children}</div>
}

export default layout
