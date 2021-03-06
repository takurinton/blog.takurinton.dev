import { Flex, Spacer } from "@takurinton/ingred-ui";
import React from "react";
import { HeaderContainer, HeaderNav, HeaderTitle } from "./styled";
import { A, Link } from "../utils/styled";

export default function Header() {
  return (
    <HeaderContainer>
      <Flex display="flex" height={`80px`} justifyContent="space-between">
        <Flex display="flex" alignItems="center">
          <HeaderTitle>
            <Link to="/">blog.takurinton.dev</Link>
          </HeaderTitle>
        </Flex>
        <Flex
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexGrow={1}
        >
          <HeaderNav>
            <A href="/rss.xml">RSS</A>
          </HeaderNav>
          <Spacer pl={3} />
          <HeaderNav
          // onMouseEnter={handleMouseEnterExternalLinks}
          >
            <Link to="/external">External</Link>
          </HeaderNav>
        </Flex>
      </Flex>
    </HeaderContainer>
  );
}
