interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourtPartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourtPartBaseWithDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourtPartBaseWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourtPartBaseWithDescription {
  type: "special";
  requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;
