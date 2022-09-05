import styled from '@emotion/styled';
import {HTMLAttributes} from "react";

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