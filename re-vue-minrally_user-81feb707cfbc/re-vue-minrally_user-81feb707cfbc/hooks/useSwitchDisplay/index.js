import { TYPE_LAYOUT_RALLY } from "@utils/constants";
import { useCallback, useState } from "react";
import styles from "./styles.module.scss";

const ListLayout = [
  {
    key: "single",
    icon: "/icons/ic-single.png",
    iconActive: "/icons/ic-single-active.png",
    layout: TYPE_LAYOUT_RALLY.single
  },
  {
    key: "grid",
    icon: "/icons/ic-grid.png",
    iconActive: "/icons/ic-grid-active.png",
    layout: TYPE_LAYOUT_RALLY.grid
  },
  {
    key: "list",
    icon: "/icons/ic-list.png",
    iconActive: "/icons/ic-list-active.png",
    layout: TYPE_LAYOUT_RALLY.list
  }
];

const useSwitchDisplay = () => {
  const [isActive, setIsActive] = useState(ListLayout[1]?.key);
  const [layout, setLayout] = useState(ListLayout[1]?.layout);

  const renderSwitchDisplay = useCallback(() => {
    return (
      // <Row justify="space-between " align="middle" {...rest}>
      //   <div className={styles.totalResult}>該当件数：200件</div>
      <div className={styles.switching}>
        <span className={styles.label}>表示切替</span>

        {ListLayout.map(item => {
          const active = item.key === isActive;

          return (
            <div
              key={item.key}
              className={styles.icon}
              onClick={() => {
                setIsActive(item.key);
                setLayout(item.layout);
              }}
            >
              <img src={active ? item.iconActive : item.icon} alt="ic-layout" />
            </div>
          );
        })}
      </div>
    );
  }, [setIsActive, isActive, setLayout]);

  return {
    renderSwitchDisplay,
    layout
  };
};

export default useSwitchDisplay;
