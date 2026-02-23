'use client';

import { useRouter } from 'next/navigation';
import { User, useUserStore } from '@/entities/user/model';
import { AGE_OPTIONS, GENDER_OPTIONS } from '@/views/onboarding/model/constants';
import { useProfileEdit } from '@/features/profile-edit/model/useProfileEdit';
import { ProfileImageUploader } from './components/ProfileImageUploader';
import { EditSection } from './components/EditSection';
import { Placeholder } from '@/shared/ui/Placeholder';
import { BtnSelection } from '@/shared/ui/BtnSelection';
import { BackHeader } from '@/shared/ui/BackHeader';
import { FixedBottomButton } from '@/shared/ui/FixedBottomButton';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const ProfileEditPage = () => {
    const { user } = useUserStore();
    const router = useRouter();
    if (!user) return null;

    return <ProfileEditContent user={user} router={router} />;
};

const ProfileEditContent = ({ user, router }: { user: User, router: AppRouterInstance }) => {
    const {
        profileImage, setProfileImage,
        name, setName,
        selectedAge, setSelectedAge,
        selectedGender, setSelectedGender,
        handleSubmit
    } = useProfileEdit(user);

    return (
        <div className='min-h-screen'>
            <BackHeader onBack={() => router.back()} />
            <div className="max-w-md mx-auto bg-white flex flex-col px-6 pt-10 pb-6">
                <ProfileImageUploader profileImage={profileImage} setProfileImage={setProfileImage} />

                <div className="flex flex-col flex-grow gap-10">
                    <EditSection label="닉네임">
                        <Placeholder value={name} setValue={setName} />
                    </EditSection>

                    <EditSection label="연령대">
                        <div className="flex flex-wrap gap-2">
                            {AGE_OPTIONS.map((age) => (
                                <BtnSelection key={age} selected={selectedAge === age} onClick={() => setSelectedAge(age)}>
                                    {age}
                                </BtnSelection>
                            ))}
                        </div>
                    </EditSection>

                    <EditSection label="성별">
                        <div className="flex gap-2">
                            {GENDER_OPTIONS.map((gender) => (
                                <BtnSelection key={gender} size="sm" selected={selectedGender === gender} onClick={() => setSelectedGender(gender)}>
                                    {gender}
                                </BtnSelection>
                            ))}
                        </div>
                    </EditSection>
                </div>

                <FixedBottomButton onClick={handleSubmit}>완료</FixedBottomButton>
            </div>
        </div>
    );
};