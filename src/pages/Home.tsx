import { Layout } from "@/components/Layout";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Contact } from "@/components/home/Contact";

export default function Home() {
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
