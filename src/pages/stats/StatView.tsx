import { BarChart, ColumnChart, LineChart, PieChart } from "react-chartkick";
import { PageHeading } from "../../components/PageHeading";
import { useStatConfig } from "./StatConfigContext";
import { ChartConfig } from "./stat.types";

const StatRenderer = ({ stat }: { stat: ChartConfig }) => {
  if (stat.type === "pie") {
    return <PieChart data={stat.data} label={stat.label} />;
  }

  if (stat.type === "bar") {
    return <BarChart data={stat.data} label={stat.label} />;
  }

  if (stat.type === "line") {
    return <LineChart data={stat.data} label={stat.label} />;
  }

  if (stat.type === "column") {
    return <ColumnChart data={stat.data} label={stat.label} />;
  }

  return null;
};

export const StatView = () => {
  const statConfig = useStatConfig();

  return (
    <div className="flex w-full flex-col">
      <PageHeading text={statConfig.label} />
      <div className="flex justify-center flex-col">
        {statConfig.stats.map((stat) => (
          <div key={stat.name} className="my-8">
            <h2 className="text-center text-2xl my-4">{stat.label}</h2>
            <StatRenderer stat={stat} />
          </div>
        ))}
      </div>
    </div>
  );
};
