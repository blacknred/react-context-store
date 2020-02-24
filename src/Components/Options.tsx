import * as React from "react";
import { useForm } from "../CustomHooks";


enum Orientation {
  LANDSCAPE = "landscape",
  PORTRAIT = "portrait",
  SQUARISH = "squarish"
}

enum Order {
  POPULAR = "popular",
  LATEST = "latest",
  OLDEST = "oldest"
}

interface IFilters {
  collections: string[];
  orientation: null | Orientation;
}

type SortBy = null | Order;

interface IOptions {
  isInfinite: boolean;
  query: string;
  sortBy: SortBy;
  collections: string[];
  orientation: null | Orientation;
}

interface IProps {
  setInfinite: Function;
  changeUrl: Function;
}

export default function Filters({ setInfinite, changeUrl }: IProps) {
  const [isInfinite, setIsInfinite] = React.useState(false);
  const [{ query }, changeFields] = useForm({ query: "" });
  const [sortBy, setSort] = React.useState<SortBy>(null);
  const [filters, setFilter] = React.useState<IFilters>({
    collections: [],
    orientation: null
  });

  function deriveOptionsFromCache() {
    const rawOptions = localStorage.getItem("if_options");

    if (!rawOptions) return;

    const options: IOptions = JSON.parse(rawOptions);

    if (options.isInfinite) {
      setIsInfinite(Boolean(options.isInfinite));
    }
    if (options.query) {
      changeFields(options.query);
    }
    if (options.collections) {
      if (options.collections && options.collections.length) {
        setFilter({ ...filters, collections: options.collections });
      }
    }
    if (options.orientation) {
      const typedOrientation = options.orientation as keyof typeof Orientation;
      setFilter({ ...filters, orientation: Orientation[typedOrientation] });
    }
    if (options.sortBy) {
      const typedOrder = options.sortBy as keyof typeof Order;
      setSort(Order[typedOrder]);
    }
  }

  function saveOptionsToCache() {
    const options = { isInfinite, query, ...filters, sortBy };
    localStorage.setItem("if_options", JSON.stringify(options));
  }

  React.useEffect(() => {
    deriveOptionsFromCache();

    return saveOptionsToCache;
  }, []);

  React.useEffect(() => {
    let url = "https://api.unsplash.com/search/photos?";

    if (query.length) {
      url += `&query=${query}`;
    }

    if (filters.collections) {
      url += `&collections=${filters.collections.join(",")}`;
    }

    if (filters.orientation) {
      url += `&orientation=${filters.orientation}`;
    }

    if (sortBy) {
      url += `&order_by=${sortBy}`;
    }

    // changeUrl(url);
  }, [filters, sortBy]);

  // React.useEffect(() => {
  //   console.log('here');
  //   // setInfinite(isInfinite);
  // }, [isInfinite, setInfinite]);

  return (
    <form>
      <div>
        <input
          type="checkbox"
          name="isInfinite"
          id="isInfinite"
          checked={isInfinite}
          onChange={() => setInfinite(!isInfinite)}
        />
        <label htmlFor="isInfinite">Infinite scrolling</label>
      </div>
      <br />
      <div>
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          placeholder="search by keywords"
          onChange={changeFields}
        />
      </div>
    </form>
  );
}
