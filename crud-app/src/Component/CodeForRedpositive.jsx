import { Box, Typography, styled } from "@mui/material";

import Youtube from "../Assets/Images/1.jpeg";
import InstaTele from "../Assets/Images/InstaTele.png";

const Header = styled(Box)`
  margin: 50px;
  & > div {
    margin-top: 50px;
  }
`;

const Image = styled("img")({
  width: "50%",
  height: "50%",
});

const CodeForRedpositive = () => {
  return (
    <Header>
      <Typography variant="h4">Code for RedPositive</Typography>
      <Box style={{ display: "flex" }}>
        <Image src={Youtube} />
        <Image src={InstaTele} />
      </Box>
    </Header>
  );
};

export default CodeForRedpositive;
