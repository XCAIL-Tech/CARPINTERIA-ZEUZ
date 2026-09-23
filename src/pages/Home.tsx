import { Layout } from "@/components/Layout";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Contact } from "@/components/home/Contact";
import { usePageMeta } from "@/lib/usePageMeta";

export default function Home() {
  usePageMeta();

  return (
    <Layout>
      <Hero />
      <Categories />
      <Services />
      <Process />
      <Contact />
    </Layout>
  );
}
