import WapperContent from "@components/WapperContent";
import { Loading } from "@features/dashboard/components/Loading";
import Banner from "@features/news/user/Banner";
import { policyService } from "@services/policy";
import type { INews } from "@typeRules/index";
import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PolicyDetail = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState<INews>();
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
    policyService
      .getPolicyById(Number(id))
      .then((data) => {
        setPolicy(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <Banner
        dataBanner={{
          name: "navigation.header.policy_detail",
          listNavigate: [
            { name: "navigation.header.policy_detail", path: `/policy/${id}` },
          ],
        }}
      />
      {policy ? (
        <WapperContent>
          <div className="pb-spc120 px-5">
            <h3 className="lg:title-32 title-24 leading-[36px] text-secondary uppercase mb-6">
              {policy?.title}
            </h3>
            <p className="font-semibold text-base text-GreyPrimary">
              {policy?.description}
            </p>
            <div
              className="mt-4"
              dangerouslySetInnerHTML={{
                __html: policy?.content,
              }}
            ></div>
          </div>
        </WapperContent>
      ) : loading ? (
        <div className="flex items-center justify-center h-[200px]">
          <Loading />
        </div>
      ) : null}
    </div>
  );
};

export default PolicyDetail;
