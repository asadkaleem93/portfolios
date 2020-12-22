import * as React from "react";

export const DangerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16.097" height="13.684" viewBox="0 0 16.097 13.684">
    <g id="danger" transform="translate(-3 -47.365)">
      <g id="Group_996" data-name="Group 996" transform="translate(3 47.365)">
        <path
          id="Path_2663"
          fill="#11649b"
          d="M15.955 50.554L8.893 38.842a.986.986 0 0 0-1.689 0L.142 50.554a.986.986 0 0 0 .845 1.5H15.11a.986.986 0 0 0 .845-1.5zm-7.9-8.138a.668.668 0 0 1 .749.634c0 1.238-.146 3.016-.146 4.253 0 .322-.354.458-.6.458-.333 0-.614-.135-.614-.458 0-1.238-.146-3.016-.146-4.253-.004-.405.329-.634.756-.634zm.01 7.664a.8.8 0 1 1 .79-.8.813.813 0 0 1-.791.801z"
          data-name="Path 2663"
          transform="translate(0 -38.365)"
        />
      </g>
    </g>
  </svg>
);

export const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="9.257" height="11.398" viewBox="0 0 9.257 11.398">
    <path d="M222.665 154.7a.267.267 0 0 0-.267.267v5.045a.267.267 0 1 0 .534 0v-5.042a.267.267 0 0 0-.267-.27zm0 0" fill="#989898" data-name="Path 3" transform="translate(-216.462 -150.574)" />
    <path d="M104.665 154.7a.267.267 0 0 0-.267.267v5.045a.267.267 0 0 0 .534 0v-5.042a.267.267 0 0 0-.267-.27zm0 0" fill="#989898" data-name="Path 4" transform="translate(-101.611 -150.574)" />
    <path
      d="M.755 3.392v6.576a1.473 1.473 0 0 0 .392 1.016 1.314 1.314 0 0 0 .953.416h5.05a1.314 1.314 0 0 0 .954-.412 1.473 1.473 0 0 0 .396-1.02V3.392a1.02 1.02 0 0 0-.262-2.005H6.867v-.334A1.048 1.048 0 0 0 5.81 0H3.44a1.048 1.048 0 0 0-1.057 1.053v.334H1.016a1.02 1.02 0 0 0-.261 2.005zm6.4 7.471H2.1a.845.845 0 0 1-.811-.894V3.415h6.673v6.553a.845.845 0 0 1-.811.894zm-4.238-9.81A.514.514 0 0 1 3.44.532h2.37a.514.514 0 0 1 .523.52v.334H2.917zm-1.9.867h7.217a.48.48 0 0 1 0 .961H1.016a.48.48 0 0 1 0-.961zm0 0"
      fill="#989898"
      data-name="Path 5"
      transform="translate(.003 .002)"
    />
    <path d="M163.665 154.7a.267.267 0 0 0-.267.267v5.045a.267.267 0 0 0 .534 0v-5.042a.267.267 0 0 0-.267-.27zm0 0" fill="#989898" data-name="Path 6" transform="translate(-159.036 -150.574)" />
  </svg>
);

export const TickFilledIcon = (props: { width?: string; height?: string }) => {
  const { width = "13", height = "13" } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 13 13">
      <g transform="translate(-276.17 -217.065)">
        <path
          fill="#59ae3a"
          d="M13.563 7.063a6.5 6.5 0 1 1-6.5-6.5 6.5 6.5 0 0 1 6.5 6.5zM6.311 10.5l4.823-4.823a.419.419 0 0 0 0-.593L10.54 4.5a.419.419 0 0 0-.593 0L6.014 8.428 4.178 6.592a.419.419 0 0 0-.593 0l-.593.593a.419.419 0 0 0 0 .593L5.718 10.5a.419.419 0 0 0 .593 0z"
          data-name="Icon awesome-check-circle"
          transform="translate(275.607 216.503)"
        />
      </g>
    </svg>
  );
};

export const NotificationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20.668" height="23.621" viewBox="0 0 20.668 23.621">
    <path
      id="Icon_awesome-bell"
      d="M10.334 23.621a2.952 2.952 0 0 0 2.951-2.953h-5.9a2.952 2.952 0 0 0 2.949 2.953zm9.937-6.907c-.891-.958-2.559-2.4-2.559-7.118a7.285 7.285 0 0 0-5.9-7.158v-.962a1.475 1.475 0 1 0-2.951 0v.961A7.285 7.285 0 0 0 2.956 9.6c0 4.719-1.668 6.16-2.559 7.118a1.441 1.441 0 0 0-.4 1 1.478 1.478 0 0 0 1.481 1.476h17.709a1.477 1.477 0 0 0 1.481-1.476 1.441 1.441 0 0 0-.4-1z"
      data-name="Icon awesome-bell"
    />
  </svg>
);

export const TableArrowsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="6.39" height="8.891" viewBox="0 0 6.39 8.891">
    <path
      id="Icon_awesome-sort"
      d="M1.728 9.164h5.316a.537.537 0 0 1 .38.916l-2.658 2.658a.534.534 0 0 1-.757 0L1.348 10.08a.537.537 0 0 1 .38-.916zm5.7-2.345L4.766 4.162a.534.534 0 0 0-.757 0L1.348 6.819a.537.537 0 0 0 .38.916h5.316a.537.537 0 0 0 .379-.916z"
      data-name="Icon awesome-sort"
      transform="translate(-1.191 -4.004)"
    />
  </svg>
);

export const ChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="5" viewBox="0 0 9 5">
    <path id="Polygon_790" data-name="Polygon 790" d="M3259.5,34l-4.49-5h8.98Z" transform="translate(-3255 -29)" />
  </svg>
);

export const TilesVisualIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="55" height="34" viewBox="0 0 55 34">
    <g id="prefix__Group_3" data-name="Group 3" transform="translate(-574 -194)">
      <path id="prefix__Rectangle_26" d="M0 0H3V14H0z" data-name="Rectangle 26" transform="translate(574 214)" />
      <path id="prefix__Rectangle_26-2" d="M0 0H3V27H0z" data-name="Rectangle 26" transform="translate(578 201)" />
      <path id="prefix__Rectangle_26-3" d="M0 0H3V19H0z" data-name="Rectangle 26" transform="translate(582 209)" />
      <path id="prefix__Rectangle_26-4" d="M0 0H3V34H0z" data-name="Rectangle 26" transform="translate(586 194)" />
      <path id="prefix__Rectangle_26-5" d="M0 0H3V22H0z" data-name="Rectangle 26" transform="translate(590 206)" />
      <path id="prefix__Rectangle_26-6" d="M0 0H3V10H0z" data-name="Rectangle 26" transform="translate(594 218)" />
      <path id="prefix__Rectangle_26-7" d="M0 0H3V22H0z" data-name="Rectangle 26" transform="translate(598 206)" />
      <path id="prefix__Rectangle_26-8" d="M0 0H3V19H0z" data-name="Rectangle 26" transform="translate(602 209)" />
      <path id="prefix__Rectangle_26-9" d="M0 0H3V16H0z" data-name="Rectangle 26" transform="translate(606 212)" />
      <path id="prefix__Rectangle_26-10" d="M0 0H3V21H0z" data-name="Rectangle 26" transform="translate(610 207)" />
      <path id="prefix__Rectangle_26-11" d="M0 0H3V23H0z" data-name="Rectangle 26" transform="translate(614 205)" />
      <path id="prefix__Rectangle_26-12" d="M0 0H3V25H0z" data-name="Rectangle 26" transform="translate(618 203)" />
      <path id="prefix__Rectangle_26-13" d="M0 0H3V22H0z" data-name="Rectangle 26" transform="translate(622 206)" />
      <path id="prefix__Rectangle_26-14" d="M0 0H3V18H0z" data-name="Rectangle 26" transform="translate(626 210)" />
    </g>
  </svg>
);

export const TableViewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13.104" height="8.146" viewBox="0 0 13.104 8.146">
    <g id="prefix__Icon_feather-eye" data-name="Icon feather-eye" transform="translate(-1 -6)">
      <path id="prefix__Path_1" d="M1.5 9.573S3.7 6 7.552 6 13.6 9.573 13.6 9.573s-2.2 3.573-6.052 3.573S1.5 9.573 1.5 9.573z" className="prefix__cls-1" data-name="Path 1" transform="translate(0 .5)" />
      <path id="prefix__Path_2" d="M16.5 15a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5z" className="prefix__cls-1" data-name="Path 2" transform="translate(-7.462 -5)" />
    </g>
  </svg>
);

export const TableDraftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="9.257" height="11.398" viewBox="0 0 9.257 11.398">
    <g id="delete" transform="translate(.003 .001)">
      <path id="Path_3" d="M222.665 154.7a.267.267 0 0 0-.267.267v5.045a.267.267 0 1 0 .534 0v-5.042a.267.267 0 0 0-.267-.27zm0 0" className="cls-1" data-name="Path 3" transform="translate(-216.465 -150.575)" />
      <path id="Path_4" d="M104.665 154.7a.267.267 0 0 0-.267.267v5.045a.267.267 0 0 0 .534 0v-5.042a.267.267 0 0 0-.267-.27zm0 0" className="cls-1" data-name="Path 4" transform="translate(-101.615 -150.575)" />
      <path
        id="Path_5"
        d="M.755 3.392v6.576a1.473 1.473 0 0 0 .392 1.016 1.314 1.314 0 0 0 .953.416h5.05a1.314 1.314 0 0 0 .954-.412 1.473 1.473 0 0 0 .396-1.02V3.392a1.02 1.02 0 0 0-.262-2.005H6.867v-.334A1.048 1.048 0 0 0 5.81 0H3.44a1.048 1.048 0 0 0-1.057 1.053v.334H1.016a1.02 1.02 0 0 0-.261 2.005zm6.4 7.471H2.1a.845.845 0 0 1-.811-.894V3.415h6.673v6.553a.845.845 0 0 1-.811.894zm-4.238-9.81A.514.514 0 0 1 3.44.532h2.37a.514.514 0 0 1 .523.52v.334H2.917zm-1.9.867h7.217a.48.48 0 0 1 0 .961H1.016a.48.48 0 0 1 0-.961zm0 0"
        className="cls-1"
        data-name="Path 5"
      />
      <path id="Path_6" d="M163.665 154.7a.267.267 0 0 0-.267.267v5.045a.267.267 0 0 0 .534 0v-5.042a.267.267 0 0 0-.267-.27zm0 0" className="cls-1" data-name="Path 6" transform="translate(-159.04 -150.575)" />
    </g>
  </svg>
);

export const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="21.724" height="15.828" viewBox="0 0 21.724 15.828">
    <g id="prefix__Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(1 1.414)">
      <path id="prefix__Path_55" d="M27.224 18H7.5" data-name="Path 55" transform="translate(-7.5 -11.5)" />
      <path id="prefix__Path_56" d="M24.5 7.5L18 14l6.5 6.5" data-name="Path 56" transform="translate(-18 -7.5)" />
    </g>
  </svg>
);

export const RightChevronIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="7.226" height="12.639" viewBox="0 0 7.226 12.639">
      <path id="prefix__Icon_ionic-ios-arrow-back" d="M16.3 12.511l-4.784-4.778A.9.9 0 0112.8 6.457l5.418 5.414a.9.9 0 01.026 1.245L12.8 18.569a.9.9 0 11-1.279-1.275z" data-name="Icon ionic-ios-arrow-back" transform="translate(-11.251 -6.194)" />
    </svg>
  );
};

export const CreateNewIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13.402" height="13.402" viewBox="0 0 13.402 13.402">
      <path
        id="Icon_ionic-ios-add-circle"
        d="M10.076 3.375a6.7 6.7 0 1 0 6.7 6.7 6.7 6.7 0 0 0-6.7-6.7zm2.916 7.217h-2.4v2.4a.515.515 0 0 1-1.031 0v-2.4h-2.4a.515.515 0 1 1 0-1.031h2.4v-2.4a.515.515 0 0 1 1.031 0v2.4h2.4a.515.515 0 0 1 0 1.031z"
        className="cls-1"
        data-name="Icon ionic-ios-add-circle"
        transform="translate(-3.375 -3.375)"
      />
    </svg>
  );
};

export const AddNewIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
      <g id="prefix__Group_197" data-name="Group 197" transform="translate(-324 -531)">
        <circle id="prefix__Ellipse_108" cx="9" cy="9" r="9" data-name="Ellipse 108" transform="translate(324 531)" />
        <g id="prefix__Icon_ionic-ios-add-circle-outline" data-name="Icon ionic-ios-add-circle-outline" transform="translate(329.031 536.031)">
          <path
            id="prefix__Path_47"
            d="M18.249 14.066h-2.926V11.14a.628.628 0 00-1.257 0v2.926H11.14a.6.6 0 00-.628.628.608.608 0 00.628.628h2.926v2.926a.609.609 0 00.628.628.625.625 0 00.628-.628v-2.925h2.926a.628.628 0 100-1.257z"
            data-name="Path 47"
            transform="translate(-10.512 -10.512)"
          />
        </g>
      </g>
    </svg>
  );
};

export const RemoveIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
      <path
        id="prefix__Icon_material-cancel"
        d="M10.5 3a7.5 7.5 0 107.5 7.5A7.493 7.493 0 0010.5 3zm3.75 10.193l-1.057 1.057-2.693-2.692-2.692 2.692-1.058-1.057L9.443 10.5 6.75 7.808 7.808 6.75 10.5 9.443l2.693-2.693 1.057 1.058-2.692 2.692z"
        data-name="Icon material-cancel"
        transform="translate(-3 -3)"
      />
    </svg>
  );
};

export const AttachIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="5.516" height="11.032" viewBox="0 0 5.516 11.032">
      <path
        id="prefix__Icon_material-attach-file"
        d="M15.264 4.007v5.767a2.006 2.006 0 0 1-4.012 0V3.506a1.254 1.254 0 0 1 2.507 0v5.265a.5.5 0 0 1-1 0V4.007H12v4.764a1.254 1.254 0 0 0 2.507 0V3.506a2.006 2.006 0 0 0-4.012 0v6.268a2.758 2.758 0 0 0 5.516 0V4.007z"
        data-name="Icon material-attach-file"
        transform="translate(-10.5 -1.5)"
      />
    </svg>
  );
};

export const ResetIcon = () => {
  return (
    <svg viewBox="0 0 7.713 7.713">
      <path
        id="prefix__Icon_ionic-md-refresh"
        d="M9.481 12.374a2.892 2.892 0 0 1 0-5.785 2.8 2.8 0 0 1 2.025.868L9.964 9h3.374V5.625l-1.133 1.133a3.852 3.852 0 1 0 .988 3.775h-1.02a2.872 2.872 0 0 1-2.692 1.841z"
        data-name="Icon ionic-md-refresh"
        transform="translate(-5.625 -5.625)"
      />
    </svg>
  );
};

export const PendingIcon = (props: { width?: string; height?: string; color?: string }) => {
  const { width = "19.2", height = "17.8", color = "#f1bf43" } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 46.625 43.18">
      <g id="prefix__surface1" transform="translate(0 -.5)" style={{ opacity: 0.3, fill: color }}>
        <path
          id="prefix__Path_81"
          d="M254.1 204.469a12.3 12.3 0 1 0 12.3 12.3 12.317 12.317 0 0 0-12.3-12.3zm5.178 13.82H254a1.422 1.422 0 0 1-1.422-1.422v-5.272a1.422 1.422 0 1 1 2.844 0v3.85h3.851a1.422 1.422 0 0 1 0 2.844zm0 0"
          className="prefix__cls-2"
          data-name="Path 81"
          transform="translate(-219.778 -185.395)"
        />
        <path id="prefix__Path_82" d="M174.1 11.572l2.882-1.207a1.421 1.421 0 0 1 1.1 0l2.881 1.207V.5H174.1zm0 0" className="prefix__cls-2" data-name="Path 82" transform="translate(-158.247)" />
        <path
          id="prefix__Path_83"
          d="M34.322 16.23a15.1 15.1 0 0 1 4.248.608V3.994A3.5 3.5 0 0 0 35.077.5H25.56v13.209a1.422 1.422 0 0 1-1.971 1.312l-4.3-1.8-4.3 1.8a1.422 1.422 0 0 1-1.971-1.312V.5H3.494A3.5 3.5 0 0 0 0 3.994v31.583a3.5 3.5 0 0 0 3.494 3.493h17.785a15.141 15.141 0 0 1 13.043-22.84zm0 0"
          className="prefix__cls-2"
          data-name="Path 83"
        />
      </g>
    </svg>
  );
};

export const SandClockIcon = (props: { width?: string; height?: string; color?: string }) => {
  const { width = "11.4", height = "18.4", color = "#f1bf43" } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 26.278 42.369">
      <g id="prefix__sand-clock" style={{ opacity: 0.3, fill: color }}>
        <path id="prefix__Path_84" d="M43.824 198.975l-9.4-7.147-9.21 7.142A3.118 3.118 0 0 0 24 201.447v3.945h21.069v-3.922a3.16 3.16 0 0 0-1.244-2.5zm0 0" className="prefix__cls-2" data-name="Path 84" transform="translate(-21.222 -169.622)" />
        <path id="prefix__Path_85" d="M.176 0H26.1a.176.176 0 0 1 .176.176V4.8a.176.176 0 0 1-.176.176H.176A.176.176 0 0 1 0 4.8V.176A.176.176 0 0 1 .176 0zm0 0" className="prefix__cls-2" data-name="Path 85" />
        <path
          id="prefix__Path_86"
          d="M.176 323H26.1a.176.176 0 0 1 .176.176v4.624a.176.176 0 0 1-.176.176H.176A.176.176 0 0 1 0 327.8v-4.626A.176.176 0 0 1 .176 323zm0 0"
          className="prefix__cls-2"
          data-name="Path 86"
          transform="translate(0 -285.609)"
        />
        <path id="prefix__Path_87" d="M23 60.624a3.123 3.123 0 0 0 1.182 2.448l9.351 7.476 9.353-7.476a3.125 3.125 0 0 0 1.183-2.448V57H23zm0 0" className="prefix__cls-2" data-name="Path 87" transform="translate(-20.337 -50.402)" />
      </g>
    </svg>
  );
};

export const ApprovedIcon = (props: { width?: string; height?: string; color?: string }) => {
  const { width = "19.2", height = "17.8", color = "#59ae3a" } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 34.873 42.961">
      <g id="prefix__accepted" transform="translate(-48.2)" style={{ opacity: 0.2, fill: color }}>
        <path id="prefix__Path_88" d="M337.379 18.835h7.936L335.267 8.787v7.936a2.114 2.114 0 0 0 2.112 2.112z" className="prefix__cls-2" data-name="Path 88" transform="translate(-262.979 -8.05)" />
        <path
          id="prefix__Path_89"
          d="M166.712 222.8a8.178 8.178 0 1 0 8.178 8.178 8.188 8.188 0 0 0-8.178-8.178zm3.75 7.162l-3.813 3.813a1.258 1.258 0 0 1-1.78 0l-1.907-1.907a1.259 1.259 0 0 1 1.78-1.78l1.017 1.017 2.923-2.923a1.259 1.259 0 0 1 1.78 1.78z"
          className="prefix__cls-2"
          data-name="Path 89"
          transform="translate(-101.076 -204.105)"
        />
        <path
          id="prefix__Path_90"
          d="M74.4 13.3a4.634 4.634 0 0 1-4.63-4.627V0H52.829A4.634 4.634 0 0 0 48.2 4.629v33.7a4.634 4.634 0 0 0 4.629 4.629h25.615a4.634 4.634 0 0 0 4.629-4.629V13.3zm-8.764 24.269a10.7 10.7 0 1 1 10.7-10.7 10.708 10.708 0 0 1-10.7 10.7z"
          className="prefix__cls-2"
          data-name="Path 90"
        />
      </g>
    </svg>
  );
};

export const CalenderIcon = ({ fill }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="9.625" height="11" viewBox="0 0 9.625 11">
    <path
      id="Icon_awesome-calendar-alt"
      fill={fill}
      d="M0 9.969A1.032 1.032 0 0 0 1.031 11h7.563a1.032 1.032 0 0 0 1.031-1.031V4.125H0zm6.875-4.211a.259.259 0 0 1 .258-.258h.859a.259.259 0 0 1 .258.258v.859a.259.259 0 0 1-.258.258h-.859a.259.259 0 0 1-.258-.258zm0 2.75a.259.259 0 0 1 .258-.258h.859a.259.259 0 0 1 .258.258v.859a.259.259 0 0 1-.258.258h-.859a.259.259 0 0 1-.258-.258zm-2.75-2.75a.259.259 0 0 1 .258-.258h.859a.259.259 0 0 1 .258.258v.859a.259.259 0 0 1-.258.258h-.859a.259.259 0 0 1-.258-.258zm0 2.75a.259.259 0 0 1 .258-.258h.859a.259.259 0 0 1 .258.258v.859a.259.259 0 0 1-.258.258h-.859a.259.259 0 0 1-.258-.258zm-2.75-2.75a.259.259 0 0 1 .258-.258h.859a.259.259 0 0 1 .258.258v.859a.259.259 0 0 1-.258.258h-.859a.259.259 0 0 1-.258-.258zm0 2.75a.259.259 0 0 1 .258-.258h.859a.259.259 0 0 1 .258.258v.859a.259.259 0 0 1-.258.258h-.859a.259.259 0 0 1-.258-.258zm7.219-7.133H7.562V.344A.345.345 0 0 0 7.219 0h-.688a.345.345 0 0 0-.344.344v1.031H3.438V.344A.345.345 0 0 0 3.094 0h-.688a.345.345 0 0 0-.344.344v1.031H1.031A1.032 1.032 0 0 0 0 2.406v1.032h9.625V2.406a1.032 1.032 0 0 0-1.031-1.031z"
      data-name="Icon awesome-calendar-alt"
    />
  </svg>
);

export const RejectedIcon = (props: { width?: string; height?: string; color?: string }) => {
  const { width = "19.2", height = "17.8", color = "#11649b" } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 34.193 42.124">
      <g id="prefix__rejected" transform="translate(-48.199)" style={{ opacity: 0.2, fill: color }}>
        <path
          id="prefix__Path_91"
          d="M166.552 222.8a8.019 8.019 0 1 0 8.019 8.019 8.028 8.028 0 0 0-8.019-8.019zm3.677 9.95a1.234 1.234 0 0 1-1.745 1.745l-1.932-1.931-1.932 1.936a1.234 1.234 0 0 1-1.745-1.745l1.931-1.931-1.931-1.931a1.234 1.234 0 0 1 1.745-1.745l1.931 1.931 1.932-1.931a1.234 1.234 0 0 1 1.745 1.745l-1.932 1.931z"
          className="prefix__cls-2"
          data-name="Path 91"
          transform="translate(-101.256 -204.469)"
        />
        <path
          id="prefix__Path_92"
          d="M73.888 13.043A4.544 4.544 0 0 1 69.349 8.5V0H52.738A4.544 4.544 0 0 0 48.2 4.539v33.047a4.544 4.544 0 0 0 4.539 4.539h25.114a4.544 4.544 0 0 0 4.539-4.539V13.043zM65.3 36.837A10.487 10.487 0 1 1 75.783 26.35 10.5 10.5 0 0 1 65.3 36.837z"
          className="prefix__cls-2"
          data-name="Path 92"
        />
        <path id="prefix__Path_93" d="M337.337 18.639h7.782l-9.852-9.852v7.781a2.073 2.073 0 0 0 2.07 2.071z" className="prefix__cls-2" data-name="Path 93" transform="translate(-263.449 -8.064)" />
      </g>
    </svg>
  );
};

export const DraftIcon = (props: { width?: string; height?: string; color?: string }) => {
  const { width = "14.5", height = "17.9", color = "#11649b" } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 34.872 42.962">
      <g id="Group_665" data-name="Group 665" transform="translate(14553.748 13670.314)" opacity="0.2">
        <path id="Path_96" data-name="Path 96" d="M337.379,18.835h7.936L335.267,8.787v7.936A2.114,2.114,0,0,0,337.379,18.835Z" transform="translate(-14864.928 -13678.363)" fill={`${color}`} />
        <path
          id="Path_98"
          data-name="Path 98"
          d="M74.4,13.3A4.634,4.634,0,0,1,69.77,8.673V0H52.829A4.634,4.634,0,0,0,48.2,4.629v33.7a4.634,4.634,0,0,0,4.629,4.629H78.444a4.634,4.634,0,0,0,4.629-4.629V13.3Z"
          transform="translate(-14601.948 -13670.314)"
          fill={`${color}`}
        />
      </g>
    </svg>
  );
};

export const ApplicationDrawertoggleOutside = (props: { width?: string; height?: string }): JSX.Element => {
  const { width = "19.602", height = "63.528" } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 19.602 63.528">
      <g id="Group_762" data-name="Group 762" transform="translate(-132.998 -148)">
        <path
          id="Path_105"
          data-name="Path 105"
          d="M5391-21014.9c10.644-2.084,14.864-8.336,14.864-8.336,6.162-7.121,17.208-21.322,31.544,0a27.428,27.428,0,0,0,17.118,8.336C5454.659-21015.031,5390.611-21015.045,5391-21014.9Z"
          transform="translate(-20881.906 -5242.998) rotate(90)"
          fill="#11649b"
        />
        <path
          id="Icon_ionic-ios-arrow-forward"
          data-name="Icon ionic-ios-arrow-forward"
          d="M16.605,12.9,11.528,7.829a.955.955,0,0,1,0-1.354.967.967,0,0,1,1.358,0l5.752,5.748a.957.957,0,0,1,.028,1.322L12.89,19.333a.959.959,0,1,1-1.358-1.354Z"
          transform="translate(127.753 166.802)"
          fill="#fff"
        />
      </g>
    </svg>
  );
};

export const ApplicationDrawertoggleInside = (props: { width?: string; height?: string }): JSX.Element => {
  const { width = "19.602", height = "63.528" } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 19.602 63.528">
      <g id="Group_763" data-name="Group 763" transform="translate(-132.998 -148)">
        <path
          id="Path_105"
          data-name="Path 105"
          d="M5391-21014.9c10.644-2.084,14.864-8.336,14.864-8.336,6.162-7.121,17.208-21.322,31.544,0a27.428,27.428,0,0,0,17.118,8.336C5454.659-21015.031,5390.611-21015.045,5391-21014.9Z"
          transform="translate(-20881.906 -5242.998) rotate(90)"
          fill="#11649b"
        />
        <path
          id="Icon_ionic-ios-arrow-forward"
          data-name="Icon ionic-ios-arrow-forward"
          d="M13.559,12.9l5.078-5.073a.955.955,0,0,0,0-1.354.967.967,0,0,0-1.358,0l-5.753,5.748a.957.957,0,0,0-.028,1.322l5.777,5.788a.959.959,0,0,0,1.358-1.354Z"
          transform="translate(127.753 166.802)"
          fill="#fff"
        />
      </g>
    </svg>
  );
};

export const DollarSnapshotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="prefix__business" width="35" height="35" viewBox="0 0 35 35">
      <g id="prefix__Group_862" data-name="Group 862">
        <path
          id="prefix__Path_355"
          d="M29.874 5.126A17.5 17.5 0 0 0 5.126 29.874 17.5 17.5 0 0 0 29.874 5.126zM18.6 25.115h-.073v2.27a1.025 1.025 0 0 1-2.051 0v-2.27h-2.271a1.025 1.025 0 0 1 0-2.051H18.6a2.27 2.27 0 0 0 0-4.539h-2.2a4.32 4.32 0 0 1 0-8.641h.073V7.615a1.025 1.025 0 1 1 2.051 0v2.27h2.27a1.025 1.025 0 0 1 0 2.051H16.4a2.269 2.269 0 0 0 0 4.539h2.2a4.32 4.32 0 0 1 0 8.641z"
          data-name="Path 355"
          style={{ fill: "#59ae3a" }}
        />
      </g>
    </svg>
  );
};

export const AppsPassedClosingDateIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
      <path
        id="prefix__Path_440"
        d="M685.589 256.346a17.5 17.5 0 1 0 17.5 17.5 17.5 17.5 0 0 0-17.5-17.5zm0 28.437a2.187 2.187 0 1 1 2.187-2.187 2.19 2.19 0 0 1-2.187 2.187zm2.187-8.749a2.187 2.187 0 1 1-4.375 0V266.1a2.187 2.187 0 1 1 4.375 0z"
        data-name="Path 440"
        transform="translate(-668.089 -256.346)"
        style={{ fill: "#e77355" }}
      />
    </svg>
  );
};

export const UpcomingClosingDateIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
      <g id="prefix__Group_996" data-name="Group 996" transform="translate(-754 -107)">
        <circle id="prefix__Ellipse_69" cx="17.5" cy="17.5" r="17.5" fill="#d87bc2" data-name="Ellipse 69" transform="translate(754 107)" />
        <g id="prefix__interface" transform="translate(762 114)">
          <path
            id="prefix__Path_358"
            d="M64.551 237.6h1.835a.551.551 0 0 0 .551-.551v-1.835a.551.551 0 0 0-.551-.551h-1.835a.551.551 0 0 0-.551.551v1.835a.551.551 0 0 0 .551.551zm0 0"
            className="prefix__cls-2"
            data-name="Path 358"
            transform="translate(-61.487 -225.453)"
            fill="#fff"
          />
          <path
            id="prefix__Path_366"
            d="M64.551 237.6h1.835a.551.551 0 0 0 .551-.551v-1.835a.551.551 0 0 0-.551-.551h-1.835a.551.551 0 0 0-.551.551v1.835a.551.551 0 0 0 .551.551zm0 0"
            className="prefix__cls-2"
            data-name="Path 366"
            transform="translate(-56.184 -225.453)"
            fill="#fff"
          />
          <path
            id="prefix__Path_368"
            d="M64.551 237.6h1.835a.551.551 0 0 0 .551-.551v-1.835a.551.551 0 0 0-.551-.551h-1.835a.551.551 0 0 0-.551.551v1.835a.551.551 0 0 0 .551.551zm0 0"
            className="prefix__cls-2"
            data-name="Path 368"
            transform="translate(-50.882 -225.453)"
            fill="#fff"
          />
          <path
            id="prefix__Path_364"
            d="M64.551 237.6h1.835a.551.551 0 0 0 .551-.551v-1.835a.551.551 0 0 0-.551-.551h-1.835a.551.551 0 0 0-.551.551v1.835a.551.551 0 0 0 .551.551zm0 0"
            className="prefix__cls-2"
            data-name="Path 364"
            transform="translate(-61.487 -221.035)"
            fill="#fff"
          />
          <path
            id="prefix__Path_365"
            d="M64.551 237.6h1.835a.551.551 0 0 0 .551-.551v-1.835a.551.551 0 0 0-.551-.551h-1.835a.551.551 0 0 0-.551.551v1.835a.551.551 0 0 0 .551.551zm0 0"
            className="prefix__cls-2"
            data-name="Path 365"
            transform="translate(-56.184 -221.035)"
            fill="#fff"
          />
          <path
            id="prefix__Path_363"
            d="M16.465 2.513h-.838V.838A.838.838 0 0 0 14.789 0h-.838a.838.838 0 0 0-.838.838v1.675H5.864V.838A.838.838 0 0 0 5.026 0h-.837a.838.838 0 0 0-.838.838v1.675h-.838A2.516 2.516 0 0 0 0 5.026v12.565A2.516 2.516 0 0 0 2.513 20.1h13.952a2.516 2.516 0 0 0 2.513-2.513V5.026a2.516 2.516 0 0 0-2.513-2.513zm.835 15.078a.839.839 0 0 1-.838.838H2.513a.839.839 0 0 1-.838-.838V8.41H17.3zm0 0"
            className="prefix__cls-2"
            data-name="Path 363"
            fill="#fff"
          />
        </g>
      </g>
    </svg>
  );
};

export const TotalAmountClosed = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35">
      <g id="prefix__Group_995" data-name="Group 995" transform="translate(-414 -107)">
        <circle id="prefix__Ellipse_68" cx="17.5" cy="17.5" r="17.5" fill="#ff9c49" data-name="Ellipse 68" transform="translate(414 107)" />
        <g id="prefix__dollar-symbol" transform="translate(422 115)">
          <path id="prefix__Path_340" d="M103.413 10.8a11.749 11.749 0 0 1 2.116-.081A7.23 7.23 0 0 1 107.116.01a6.056 6.056 0 0 0-3.7 10.785z" className="prefix__cls-2" data-name="Path 340" transform="translate(-97.183 -.01)" fill="#fff" />
          <path
            id="prefix__Path_341"
            d="M202.226 10.705h1.574a2.362 2.362 0 0 1 2.161 1.407 6.057 6.057 0 1 0-3.739-1.407zm3.289-7.75v-.5a.587.587 0 1 1 1.174 0v.5a2.107 2.107 0 0 1 .825.149 2.182 2.182 0 0 1 .789.538.587.587 0 1 1-.856.8.977.977 0 0 0-.7-.315H205.4a.67.67 0 0 0 0 1.339h1.4a1.846 1.846 0 1 1-.112 3.689v.5a.587.587 0 1 1-1.174 0v-.5a2.195 2.195 0 0 1-1.395-.392.587.587 0 0 1 .669-.965.989.989 0 0 0 .541.183h1.471a.67.67 0 0 0 0-1.339h-1.4a1.846 1.846 0 1 1 .112-3.689z"
            className="prefix__cls-2"
            data-name="Path 341"
            transform="translate(-192.226)"
            fill="#fff"
          />
          <path
            id="prefix__Path_342"
            d="M19.57 306.416a1.3 1.3 0 0 0-1.845 0l-1.915 1.917a1.119 1.119 0 0 1-.791.328h-4.983a1.308 1.308 0 0 1 0-2.616h1.518a1.2 1.2 0 0 0 1.212-1.161 1.188 1.188 0 0 0-1.187-1.217H7.217a4.876 4.876 0 0 0-3.753 1.765l-.707.9a.2.2 0 0 1-.154.075H.391A.391.391 0 0 0 0 306.8v4.55a.391.391 0 0 0 .391.392h15.114a1.431 1.431 0 0 0 1.013-.42l3.052-3.055a1.307 1.307 0 0 0 0-1.847z"
            className="prefix__cls-2"
            data-name="Path 342"
            transform="translate(0 -291.786)"
            fill="#fff"
          />
        </g>
      </g>
    </svg>
  );
};
export const GrayTick = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15.98" height="11.882" viewBox="0 0 15.98 11.882">
    <path id="prefix__Path_812" fill="none" stroke="#d4d4d4" strokeLinecap="round" strokeWidth="1.4px" d="M-1831.735 3863.645l4.1 4.17 9.9-9.9" data-name="Path 812" transform="translate(1832.725 -3856.927)" />
  </svg>
);

export const GreenTick = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15.98" height="11.882" viewBox="0 0 15.98 11.882">
    <path id="prefix__Path_809" fill="none" stroke="#59ae3a" strokeLinecap="round" strokeWidth="1.4px" d="M-1831.735 3863.645l4.1 4.17 9.9-9.9" data-name="Path 809" transform="translate(1832.725 -3856.927)" />
  </svg>
);
