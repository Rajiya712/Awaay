import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
  Box,
  ThemeIcon,
} from "@mantine/core";
import {IconChevronLeft} from "@tabler/icons-react";
import {Link} from "react-router-dom";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

export function UserButton({image, name, email, icon, ...others}) {
  const {classes} = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{display: "flex", alignItems: "center"}}>
            <ThemeIcon variant="light" size={30}>
              <IconChevronLeft size="1.1rem" />
            </ThemeIcon>
            <Box ml="md">Back to Home</Box>
          </Box>
        </Group>
      </Link>
    </UnstyledButton>
  );
}
