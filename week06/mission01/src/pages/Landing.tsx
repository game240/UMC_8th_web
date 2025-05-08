import ItemThumbnail from "../components/landing/ItemThumbnail";
import Toggle from "../components/landing/toggle";

const Landing = () => {
  return (
    <main className="flex flex-col gap-4 pt-20 px-[6%] size-full">
      <div className="flex justify-end w-full pr-[2%]">
        <Toggle />
      </div>
      <section className="grid grid-cols-5 h-[calc(100vh-64px)] gap-4">
        <ItemThumbnail />
        <ItemThumbnail />
        <ItemThumbnail />
        <ItemThumbnail />
        <ItemThumbnail />
      </section>
    </main>
  );
};

export default Landing;
