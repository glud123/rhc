import React, { FC } from "react";
import { createUseStyles } from "react-jss";

const Panel: FC = (props) => {
  const { children } = props;
  const styles = useStyles();
  const [demo, api, ...other] = React.Children.toArray(children);
  return (
    <div className={styles.panel}>
      <PanelItem id="demo" title="示例">
        {demo}
      </PanelItem>
      <PanelItem id="api" title="API">
        {api}
      </PanelItem>
      <PanelItem id="other" title="其他">
        {other}
      </PanelItem>
    </div>
  );
};

export default Panel;

interface PanelItemProps {
  id: string;
  title: string;
}

const PanelItem: FC<PanelItemProps> = (props) => {
  const { children, id, title } = props;
  const styles = useStyles();

  if (!children || (children && (children as any).length === 0)) {
    return null;
  }
  return (
    <div id={id} className={styles.item}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const useStyles = createUseStyles({
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  title: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  content: {},
});
