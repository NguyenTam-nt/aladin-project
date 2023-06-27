import React, { useEffect, useState } from "react";
import { TitleTopic } from "../home/components/TitleTopic";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { PolicyItem } from "./components/PolicyItem";
import { ICAdd } from "@assets/icons/ICAdd";
import { useNavigate } from "react-router-dom";
import { prefixRootRoute } from "@constants/index";
import { pathsAdmin } from "@constants/routerManager";
import { policyService } from "@services/policy";
import type { INews } from "@typeRules/index";
import { Loading, useHandleLoading } from "../components/Loading";
import { useShowMessage } from "../components/DiglogMessage";

export const Policy = () => {
  const { t } = useTranslation();
  const [policies, setPolicies] = useState<INews[]>([]);
  const navigation = useNavigate();
  const { showLoading } = useHandleLoading();
  const { showError, showSuccess } = useShowMessage();
  const [loading, setLoading] = useState(false)
  const handleNavigation = () => {
    navigation(
      `${prefixRootRoute.admin}/${pathsAdmin.policy.prefix}/${pathsAdmin.policy.add}`
    );
  };

  useEffect(() => {
    setLoading(true)
    policyService
      .getPolicy({ page: 0, size: 12, sort: "id,desc" })
      .then((data) => {
        setPolicies(data.list);
      }).finally(() => {
        setLoading(false)
      })
  }, []);

  const handleDelete = (id: number) => {
    showLoading();
    policyService
      .delete(id)
      .then(() => {
        const newPolicies = [...policies];
        const index = newPolicies.findIndex((item) => item.id === id);
        newPolicies.splice(index, 1);

        setPolicies([...newPolicies]);
        showSuccess("adminPolicy.message_delete_success");
      })
      .catch(() => {
        showError("message.actions.error.delete_banner");
      });
  };

  return (
    <>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline">
          <TitleTopic name="adminPolicy.title" isRequired={false} />
          <span className="text-_14 ml-4 italic text-text_secondary">
            {t("adminPolicy.maxItem")}
          </span>
        </div>
        {policies.length < 8 ? (
          <Button
            onClick={handleNavigation}
            className="max-w-[177px]"
            text="adminPolicy.add"
            imageLeft={
              <span className="mr-2">
                <ICAdd />
              </span>
            }
            color={"empty"}
          />
        ) : null}
      </div>
      {
        !loading && policies.length ? (
      <div className="grid grid-cols-4 gap-[24px]">
        {policies.map((item, index) => {
          return <PolicyItem onDelete={handleDelete} data={item} key={index} />;
        })}
      </div>

        ) : <div className="flex items-center justify-center h-[200px]"> <Loading /></div>
      }
    </>
  );
};
