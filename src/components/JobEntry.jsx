import Tag from "./Tag";

const JobEntry = ({ jobData, handleFilterPush }) => {

  const {
    title,
    corporation,
    startMonth,
    endMonth,
    jobTitle,
    responsibilities,
    tags,
    location,
    isOngoing,
    isFranchise,
  } = jobData;

  const dateFormatter = Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    year: "numeric",
  });

  const start = `${(new Date(startMonth).getUTCMonth()+1).toString().padStart(2, '0')}/${new Date(startMonth).getUTCFullYear()}`
  const end = `${(new Date(endMonth).getUTCMonth()+1).toString().padStart(2, '0')}/${new Date(endMonth).getUTCFullYear()}`

  return (
    <div className="text-md py-4">
      <div className="flex flex-row">
        <h1 className="grow">
          <span className="font-bold">{(isFranchise ? `${title} (${corporation})` : title)}</span>
          <span className="md:hidden">
            <br></br>
            {jobTitle}
          </span>
        </h1>
        <h1 className="hidden text-right font-bold text-neutral-500 md:block">
          {start + " - " + (isOngoing ? "ongoing" : end)}
        </h1>
      </div>
      <div className="flex flex-row">
        <h1 className="hidden grow md:block">
          <span className="">{jobTitle}</span>
        </h1>
        <h1 className="hidden text-right text-neutral-500 md:block">
          {location}
        </h1>
      </div>
      <h1 className="block font-bold text-neutral-500 md:hidden">
        {start + " - " + (isOngoing ? "ongoing" : end)}
      </h1>
      <h1 className="block text-neutral-500 md:hidden">{location}</h1>
      <div className="relative -left-4 mt-4 flex lg:w-full w-screen flex-row gap-2 overflow-x-scroll px-4">
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
