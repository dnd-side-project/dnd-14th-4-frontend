import apiClient from "@/shared/api/apiClient";
import { useUserStore } from "@/entities/user/model";
import { useRouter } from "next/navigation";

export const useWithdrawal = () => {
    const router = useRouter();
    const { setUser } = useUserStore();

    const withdraw = async () => {
        try {
            await apiClient.post('/api/v1/users/withdrawal');

            if (setUser) setUser(null);

            localStorage.removeItem('access_token');

            alert('탈퇴가 완료되었습니다. 그동안 이용해 주셔서 감사합니다.');

            router.replace('/login');
        } catch (error) {
            console.error('회원탈퇴 실패:', error);
            alert('탈퇴 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    return { withdraw };
};