import { useMutation } from "@tanstack/react-query";
import { privateAxios } from "../../../axios/privateAxios";
import { notifySuccess } from "../../../errors/notifiySuccess";

interface ActionParams {
	actionName: string;
	primaryKeyValue?: string | number
}

export const useActionMutation = (modelName: string, refetch: () => void) => {
	const mutation = useMutation({
		mutationFn: async ({ actionName, primaryKeyValue }: ActionParams) => {
			let url = (`/adomin/api/actions/${modelName}/${actionName}`)
			if (primaryKeyValue) {
				url += `/${primaryKeyValue}`
			}

			const res = await privateAxios.post(url)

			return res.data?.message
		},
		onSuccess: (message: unknown) => {
			if (typeof message === "string") {
				notifySuccess(message)
			}
			refetch()
		},
	})

	return mutation
}
