import Tag from "./Tag";

const JobEntry = ({ jobData, handleFilterPush }) => {
  const {
    company,
    startDate,
    endDate,
    title,
    responsibilities,
    tags,
    location,
    ongoing,
  } = jobData;

  const dateFormatter = Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="text-md py-4" style={{ fontFamily: "Roboto Mono" }}>
      <div className="flex flex-row">
        <h1 className="grow">
          <span className="font-bold">{company}</span>
          <span className="md:hidden">
            <br></br>
            {title}
          </span>
        </h1>
        <h1 className="hidden text-right font-bold text-neutral-500 md:block">
          {dateFormatter.format(startDate.toDate()) +
            " - " +
            (ongoing ? "ongoing" : dateFormatter.format(endDate.toDate()))}
        </h1>
      </div>
      <div className="flex flex-row">
        <h1 className="hidden grow md:block">
          <span className="">{title}</span>
        </h1>
        <h1 className="hidden text-right text-neutral-500 md:block">
          {location}
        </h1>
      </div>
      <h1 className="block font-bold text-neutral-500 md:hidden">
        {dateFormatter.format(startDate.toDate()) +
          " - " +
          (ongoing ? "ongoing" : dateFormatter.format(endDate.toDate()))}
      </h1>
      <h1 className="block text-neutral-500 md:hidden">{location}</h1>
      <div className="relative -left-4 mt-4 flex w-screen flex-row gap-2 overflow-x-scroll px-4">
        {tags.map((tag, i) => {
          return (
            <Tag
              text={tag}
              handleClick={handleFilterPush}
              key={i}
              className="hover:tag-invert"
            />
          );
        })}
      </div>
      <ul
        className="ml-6 mt-4 list-disc text-sm"
        style={{ fontFamily: "Inter" }}
      >
        {responsibilities.map((pt, i) => {
          return <li key={i}>{pt}</li>;
        })}
      </ul>
    </div>
  );
};

export default JobEntry;
