const SplitScreen = ({
    children,
    leftWidth = 1,
    rightWidth = 1
}) => {
    const [left, right] = children;
    return (
        <div className="splitScreen">
            <div style={{flex: leftWidth}} className="splitScreen__leftSide">
                {left}
            </div>
            <div style={{flex: rightWidth}} className="splitScreen__rightSide">
                {right}
            </div>
        </div>
    )
}

export default SplitScreen;