import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "../../../axios/privateAxios";
import { CenteredSpinner } from "../../../components/CenteredSpinner";
import { SimpleModal } from "../../../components/SimpleModal";

interface Props {
  url: string | null;
  close: () => void;
}

const bodyStyle =
  "display: flex; justify-content: center; align-items: center; height: 90vh; width: 95%;";

const UrlPreview = ({ url }: { url: string }) => {
  const htmlQuery = useQuery({
    queryKey: ["cmsBlockPreview", url],
    queryFn: async () => {
      const res = await privateAxios.get<string>(url);
      return res.data;
    },
  });

  if (htmlQuery.isLoading || !htmlQuery.data) {
    return <CenteredSpinner />;
  }

  return (
    <div className="w-full h-full flex justify-center">
      <iframe
        srcDoc={`<html><head><title>Preview</title></head><body style="${bodyStyle}">
          <div style="border: 1px solid #ccc;">
            ${htmlQuery.data}
          </div>
        </body></html>`}
        title="Preview"
        width="100%"
        height="600px"
      />
    </div>
  );
};

export const HtmlPreview = ({ url, close }: Props) => {
  return (
    <SimpleModal open={!!url} onClose={close} width={"80%"}>
      {url && <UrlPreview url={url} />}
    </SimpleModal>
  );
};
