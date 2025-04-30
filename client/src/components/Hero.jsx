import hero1 from "../assets/news1.jpg";
import hero2 from "../assets/news2.png";
import hero3 from "../assets/news4.jpeg";
import hero4 from "../assets/news3.avif";
import hero5 from "../assets/news2.png";

const stories = [
  {
    title: "Best fashion news of November 2022",
    category: "Fashion",
    date: "2 Years Ago",
    img: hero1,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    large: true,
  },
  {
    title: "How Not to Be a Character in a ‘Bad Fashion Movie’",
    category: "Fashion",
    img: hero2,
  },
  {
    title: "Best fashion news of November 2022",
    category: "Fashion",
    img: hero3,
  },
  {
    title: "WHO warns of oral disease: Top health stories this week",
    category: "Health",
    img: hero4,
  },
  {
    title: "Simple lifestyle changes that will help reduce stress",
    category: "Health",
    img: hero5,
  },
];

export default function HeroGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-4">
        {/* Left: Large Main Story */}
        <div className="md:col-span-2 relative h-[500px]">
          <img
            src={stories[0].img}
            alt={stories[0].title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/50 rounded-lg p-6 flex flex-col justify-end text-white">
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="bg-green-600 px-2 py-1 rounded text-xs uppercase">
                {stories[0].category}
              </span>
              <span>{stories[0].date}</span>
            </div>
            <h2 className="text-2xl font-bold">{stories[0].title}</h2>
            <p className="text-sm mt-2">{stories[0].description}</p>
          </div>
        </div>

        {/* Right: Grid of 4 Smaller Stories */}
        <div className="grid grid-cols-2 gap-4">
          {stories.slice(1).map((story, idx) => (
            <div key={idx} className="relative h-60">
              <img
                src={story.img}
                alt={story.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 rounded-lg p-3 flex flex-col justify-end text-white">
                <span
                  className={`bg-${
                    story.category === "Fashion" ? "green" : "blue"
                  }-600 text-xs px-2 py-0.5 rounded uppercase self-start mb-2`}
                >
                  {story.category}
                </span>
                <h3 className="text-sm font-semibold leading-tight">
                  {story.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
