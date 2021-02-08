export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDescriptive extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends CoursePartDescriptive {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartDescriptive {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;
