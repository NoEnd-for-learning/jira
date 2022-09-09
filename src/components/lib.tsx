import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';
import { Spin, Typography, Button } from 'antd';

interface P extends HTMLAttributes<any>{
    gap?: number | boolean | undefined,
    between?: boolean,
    marginBottom?: number,
}

export const StyledRow = styled.div`
display: flex;
align-items: center;
justify-content: ${(props: P) => props.between ? 'space-between' : undefined};
margin-bottom: ${(props: P) => props.marginBottom + 'rem'};
> * {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  margin-right: ${(props: P) =>
    typeof props.gap === 'number' ?
        props.gap + 'rem' :
        props.gap ? '2rem' : undefined
  };
}
`;

const FullPage = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`;

export const FullPageLoading = () => (
    <FullPage>
        <Spin size="large" />
    </FullPage>
);

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
    <FullPage>
        <ErrorBox error={error} />
    </FullPage>
);

// 类型守卫
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return <Typography.Text type="danger">{error?.message}</Typography.Text>;
    }
    return null;
};

export const ButtonNoPadding = styled(Button)`
padding: 0;
`;
