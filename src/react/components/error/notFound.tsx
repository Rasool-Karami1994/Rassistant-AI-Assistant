import { useNavigate } from "@tanstack/react-router";
import { RassistantLogo } from "../index";
import { Route as appHomepageIndexImport } from "@react/routes/(app)/_homepage";

const NotFoundError = (props: { data: unknown }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5 bg-[var(--primary-bg)] p-12">
      <RassistantLogo width={"20rem"} />
      <h2 className="text-2xl text-[var(--primary-color)]">
        404 - فک کنم اشتباه اومدی
      </h2>
      <button
        className="flex h-12 w-30 cursor-pointer items-center justify-center rounded-full bg-[var(--green-bg)] text-[var(--tertiary-color)]"
        onClick={() =>
          navigate({
            to: appHomepageIndexImport.to,
          })
        }
      >
        صفحه اصلی
      </button>
      {!!props.data && <code>{JSON.stringify(props.data)}</code>}
    </div>
  );
};

export default NotFoundError;
