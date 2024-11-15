import { AccountSettings } from "@/components/AccountSettings";
import { AgentSettingsForm } from "@/components/AgentSettings";
import { Loading } from "@/components/Loading";
import {
  Account,
  Agent,
  User,
  AgentsApiResponse,
  AgentApiResponse,
  AgentFormData,
  ApiResponse,
} from "@/types";
import api from "@/utils/api";
import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

type Props = {
  user: User;
};
export const AccountRoot = ({ user }: Props) => {
  const account = useLoaderData() as Account;
  const navigate = useNavigate();
  const agentLimit = 100;

  const [agents, setAgents] = useState<Agent[]>();

  // get agents
  const getAgents = async () => {
    const { data } = await api.get<AgentsApiResponse>("agents");
    setAgents(data);
    console.log("retrieved agents:");
    console.log(data);
  };

  useEffect(() => {
    getAgents();
  }, [user]);

  useEffect(() => {
    setAgents(() => agents);
  }, [agents]);

  const updateAgent = async (formData: AgentFormData): Promise<void> => {
    console.log("Submitting form data:");
    console.dir(formData);
    // Invoke API call
    try {
      await api.patch<AgentFormData, AgentApiResponse>(`agents`, formData);
      getAgents();
    } catch (error) {
      console.log(`Failed to submit: ${error}`);
    }
  };

  const deleteAgent = async (agentId: string) => {
    try {
      await api.delete<{agentId:string}, ApiResponse>("agents", { agentId });
      getAgents();
    } catch (error) {
      console.log("failed to delete:", error);
    }
  };

  return (
    <>
      <div className="my-10">
        <h1 className="text-5xl">Settings</h1>
      </div>
      <h1 className="pt-2 text-2xl font-semibold">Account</h1>
      <div className="py-2 my-4">
        {account ? <AccountSettings account={account} /> : <Loading />}
      </div>
      <div className="flex justify-between">
        <h1 className="pt-2 text-2xl font-semibold">Agents</h1>

        <Button
          onClick={() => navigate("new-agent")}
          disabled={account?.Agents.length >= agentLimit}
          className="my-2 mx-4 px-4 py-2 rounded-xl bg-violet-800 text-gray-100 data-[disabled]:bg-gray-500"
        >
          New
        </Button>
      </div>

      <div className="py-2 my-4">
        {agents ? (
          agents.map((agent) => {
            return (
              <AgentSettingsForm
                agent={agent}
                updateAgent={updateAgent}
                deleteAgent={deleteAgent}
                key={agent.agentId}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </div>
      <div className="flex flex-auto m-auto justify-center"></div>
    </>
  );
};
