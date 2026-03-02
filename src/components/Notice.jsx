import PageScaffold from "./PageScaffold";
import { Link } from "react-router";

export default function Notice({ title, message, link, to }) {
  return (
    <PageScaffold extras="flex flex-col gap-4">
      <h1 className="text-5xl">{title}</h1>
      <p>{message}</p>
      <Link to={to} className="btn-wire w-max" viewTransition>
        {link}
      </Link>
    </PageScaffold>
  );
}
