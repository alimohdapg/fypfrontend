import {VictoryPie, VictoryTheme} from "victory-native";
import React from "react";

type Props = {
  pos_pct: number;
  neu_pct: number;
  neg_pct: number;
};

export const PieChart = (props: Props) => {
    const pos_pct = props.pos_pct;
    const neu_pct = props.neu_pct;
    const neg_pct = props.neg_pct;
    return (
        <VictoryPie
            colorScale={"grayscale"}
            data={[
                {x: `Pos: ${pos_pct}%`, y: pos_pct},
                {x: `Neu: ${neu_pct}%`, y: neu_pct},
                {x: `Neg: ${neg_pct}%`, y: neg_pct},
            ]}
            theme={VictoryTheme.grayscale}
            padding={{right: 100, left: 100}}
        />
    );
};