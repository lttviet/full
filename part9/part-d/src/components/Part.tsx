import { CoursePart } from "../types"
import { assertNever } from "../utils";

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          {part.description}
        </p>
      )
    case 'groupProject':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          project exercise {part.groupProjectCount}
        </p>
      )
    case 'submission':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          {part.description}
          <br />
          submit to {part.exerciseSubmissionLink}
        </p>
      )
    case 'special':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          {part.description}
          <br />
          required skills: {part.requirements.join(', ')}
        </p>
      )
    default:
      return assertNever(part);
  }
}

export default Part;
