import { CoursePart } from '../types'

import { assertNever } from '../utils'

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({part}) => {
  switch (part.name) {
    case "Fundamentals":
      return <>{part.name} {part.exerciseCount}</>
    case "Using props to pass data":
      return <>{part.name} {part.groupProjectCount}</>
    case "Deeper type usage":
      return <>{part.name} {part.exerciseCount} {part.exerciseSubmissionLink}</>
    default:
      return assertNever(part)
  }
}

export default Part