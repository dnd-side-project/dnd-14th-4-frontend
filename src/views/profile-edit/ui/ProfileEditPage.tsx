'use client';

import { BtnSelection } from '@/shared/ui/BtnSelection';
import { EditSection } from '@/views/profile-edit/ui/components/EditSection';
import { Placeholder } from '@/shared/ui/Placeholder';
import { AGE_OPTIONS, GENDER_OPTIONS } from '@/views/onboarding/model/constants';
import { useProfileEdit } from '@/features/profile-edit/model/useProfileEdit';
import { ProfileImageUploader } from '@/views/profile-edit/ui/components/ProfileImageUploader';
import { BackHeader } from '@/shared/ui/BackHeader';
import { useRouter } from 'next/navigation';
import { FixedBottomButton } from '@/shared/ui/FixedBottomButton';


export const ProfileEditPage = () => {
    const router = useRouter();
    const {
        profileImage, setProfileImage,
        nickname, setNickname,
        selectedAge, setSelectedAge,
        selectedGender, setSelectedGender,
        handleSubmit
    } = useProfileEdit();

    return (
        <div className='min-h-screen'>
            <BackHeader onBack={() => router.back()}></BackHeader>
            <div className="max-w-md mx-auto bg-white flex flex-col px-6 pt-10 pb-6">

                <ProfileImageUploader
                    profileImage={profileImage}
                    setProfileImage={setProfileImage}
                />

                <div className="flex flex-col flex-grow gap-10">

                    <EditSection label="닉네임">
                        <Placeholder
                            value={nickname}
                            setValue={setNickname}
                        />
                    </EditSection>

                    <EditSection label="연령대">
                        <div className="flex flex-wrap gap-2">
                            {AGE_OPTIONS.map((age) => (
                                <BtnSelection
                                    key={age}
                                    selected={selectedAge === age} // 선택 여부 전달
                                    onClick={() => setSelectedAge(age)}
                                >
                                    {age}
                                </BtnSelection>
                            ))}
                        </div>
                    </EditSection>

                    <EditSection label="성별">
                        <div className="flex gap-2">
                            {GENDER_OPTIONS.map((gender) => (
                                <BtnSelection
                                    key={gender}
                                    size="sm"
                                    selected={selectedGender === gender}
                                    onClick={() => setSelectedGender(gender)}
                                >
                                    {gender}
                                </BtnSelection>
                            ))}
                        </div>
                    </EditSection>
                </div>




                <FixedBottomButton
                    onClick={handleSubmit}
                >
                    완료
                </FixedBottomButton>
            </div>
        </div>
    );
};