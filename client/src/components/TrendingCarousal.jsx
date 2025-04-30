import Slider from "react-slick";

const trendingNews = [
  {
    title: "Apple launches new AI chip to dominate tech industry",
    category: "Tech",
    img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "New government reforms spark nationwide debate",
    category: "Politics",
    img: "https://images.unsplash.com/photo-1555967525-37949d0a1f52?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Messi scores last-minute goal in epic final",
    category: "Sports",
    img: "https://images.unsplash.com/photo-1601385743162-24d62c6b7d81?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Top 10 fashion trends to follow in 2025",
    category: "Fashion",
    img: "https://images.unsplash.com/photo-1618221519430-319a7f8a1b91?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Climate change: what experts are saying",
    category: "Environment",
    img: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=400&q=80",
  },
];


export default function TrendingCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">🔥 Trending Now</h2>
      <Slider {...settings}>
        {trendingNews.map((news, idx) => (
          <div key={idx} className="px-2">
            <div className="bg-white shadow-lg rounded overflow-hidden">
              <img
                src={news.img}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs uppercase text-gray-500 block mb-1">
                  {news.category}
                </span>
                <h3 className="font-semibold text-lg leading-tight">
                  {news.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
