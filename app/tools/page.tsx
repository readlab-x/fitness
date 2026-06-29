import type { Metadata } from "next";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import ToolsClient from "./tools-client";

export const metadata: Metadata = {
  title: "训练工具箱 | FitLearn",
  description: "BMI计算、1RM估算、TDEE计算、碳水循环计划、训练周期化规划",
};

export default function ToolsPage() {
  return (
    <>
      <NavBar />
      <main className="pt-14">
        <ToolsClient />
      </main>
      <Footer />
    </>
  );
}
