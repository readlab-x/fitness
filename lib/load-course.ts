import { readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import type { Course } from "./courses";

export interface Module {
  id: string;
  title: string;
  overview: string;
  sections: { heading: string; body: string }[];
  keyPoints: string[];
}

export function getAllCourses(): Course[] {
  const ids = [
    "anatomy",
    "periodization",
    "nutrition",
    "physiology",
    "biomechanics",
    "stretching",
    "posture",
  ];
  return ids.map((id) => loadCourseMeta(id));
}

function loadCourseMeta(id: string): Course {
  const filePath = join(process.cwd(), "content", `${id}.md`);
  const fileContent = readFileSync(filePath, "utf-8");
  const { data } = matter(fileContent);
  return {
    id,
    title: data.title,
    desc: data.desc,
    image: data.image,
    level: data.level,
    duration: data.duration,
    students: data.students,
    instructor: data.instructor,
    role: data.role,
    outcomes: data.outcomes,
    modules: data.modules,
  };
}

export function loadCourse(id: string) {
  const filePath = join(process.cwd(), "content", `${id}.md`);
  const fileContent = readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const course: Course = {
    id,
    title: data.title,
    desc: data.desc,
    image: data.image,
    level: data.level,
    duration: data.duration,
    students: data.students,
    instructor: data.instructor,
    role: data.role,
    outcomes: data.outcomes,
    modules: data.modules,
  };
  const modules = parseCourseContent(content);
  return { course, modules };
}

export function parseCourseContent(markdown: string): Module[] {
  const modules: Module[] = [];
  const chunks = markdown.split(/\n---\n/);

  for (const chunk of chunks) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;

    const idMatch = trimmed.match(/^# (\S+)/m);
    const titleMatch = trimmed.match(/^## (.+)/m);
    if (!idMatch || !titleMatch) continue;

    const id = idMatch[1];
    const title = titleMatch[1].trim();

    const titleLineEnd = trimmed.indexOf(titleMatch[0]) + titleMatch[0].length;
    const remaining = trimmed.slice(titleLineEnd).trim();

    const sectionParts = remaining.split(/\n(?=### )/);

    const overview = sectionParts[0].replace(/\n{3,}/g, "\n\n").trim();

    const sections: { heading: string; body: string }[] = [];
    let keyPoints: string[] = [];

    for (let i = 1; i < sectionParts.length; i++) {
      const part = sectionParts[i];
      const headingMatch = part.match(/^### (.+)/m);
      if (!headingMatch) continue;

      const heading = headingMatch[1].trim();
      const body = part
        .slice(part.indexOf(headingMatch[0]) + headingMatch[0].length)
        .trim();

      const kpMarker = "**\u6838\u5fc3\u8981\u70b9\uff1a**";
      const kpIdx = body.indexOf(kpMarker);
      if (kpIdx !== -1) {
        const afterKp = body.slice(kpIdx + kpMarker.length).trim();
        keyPoints = afterKp
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.startsWith("- "))
          .map((l) => l.slice(2).trim());
      }

      sections.push({ heading, body });
    }

    modules.push({ id, title, overview, sections, keyPoints });
  }

  return modules;
}
