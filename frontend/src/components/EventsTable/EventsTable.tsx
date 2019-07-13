import * as React from "react";
import { CSSProperties } from "react";
import { ErrorText } from "../ErrorText";
import { EventItem } from "@App/store/statistics/types";
import { VariableSizeGrid as Grid } from "react-window";
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Input
} from "@material-ui/core";

interface Props {
  events: EventItem[];
  isFetching: boolean;
  error: string;
}

export default function EventsTable(props: Props) {
  const width = window.innerWidth;

  const columnWidths = [
    Math.floor(width / 10),
    Math.floor((5 * width) / 10),
    Math.floor((3 * width) / 10)
  ];

  const renderHeader = (columnIndex: number, style: CSSProperties) => {
    const headerStyle: CSSProperties = {
      ...style,
      fontWeight: "bold",
      position: "absolute"
    };

    switch (columnIndex) {
      case 0:
        return <div style={headerStyle}>Number</div>;
      case 1:
        return <div style={headerStyle}>Type</div>;
      case 2:
        return <div style={headerStyle}>Date</div>;
      default:
        return <div />;
    }
  };

  const Cell = ({
    columnIndex,
    rowIndex,
    style
  }: {
    columnIndex: number;
    rowIndex: number;
    style: CSSProperties;
  }) => {
    if (rowIndex === 0) {
      return renderHeader(columnIndex, style);
    }
    switch (columnIndex) {
      case 0:
        return <div style={style}>{rowIndex}</div>;
      case 1:
        let eventType = props.events[rowIndex].event_type;
        eventType = eventType.replace(/_/g, " ");
        eventType = eventType[0].toUpperCase() + eventType.slice(1);
        return <div style={style}>{eventType}</div>;
      case 2:
        return <div style={style}>{props.events[rowIndex].timestamp}</div>;
      default:
        return <div />;
    }
  };

  const renderErrorOrCard = () => {
    return props.error !== "" ? (
      <ErrorText>{props.error}</ErrorText>
    ) : (
      <Grid
        columnWidth={(index: number) => columnWidths[index]}
        rowHeight={() => 50}
        columnCount={3}
        rowCount={props.events.length}
        height={500}
        width={width}
      >
        {Cell}
      </Grid>
    );
  };

  return (
    <Card raised={true}>
      <CardHeader
        action={<Input placeholder="Search through history" />}
        title="Visit history"
      />
      <CardContent>
        {props.isFetching ? <CircularProgress /> : renderErrorOrCard()}
      </CardContent>
    </Card>
  );
}
