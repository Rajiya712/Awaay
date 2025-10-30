import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  heroSection: {
    background: ` linear-gradient(rgba(235,70,34,0.8),rgba(235,70,34,0.8)), url("/images/hero-bg.jpg") no-repeat center / cover`,
    color: theme.white,
  },

  inputsContainer: {
    background: theme.white,
    borderRadius: theme.radius.sm,
    color: theme.black,
  },
}));
