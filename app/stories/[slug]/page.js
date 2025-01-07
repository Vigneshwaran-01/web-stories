import WebStory from "@/app/components/WebStory";

export default async function StoryPage({ params }) {
  const { slug } = await params; // Await `params` if required
  return <WebStory slug={slug} />;
}








