import { CoursePart } from '../types'

import Part from './Part'

interface ContentProps {
  parts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = ({parts}) => (
  <>
    {parts.map(part => (
      <p key={part.name}>
        <Part part={part} />
      </p>
    ))}
  </>
  
)

export default Content