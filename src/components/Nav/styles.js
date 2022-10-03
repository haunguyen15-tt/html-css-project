import { Menu as AntMenu } from 'antd';
import styled from 'styled-components';

export const Menu = styled(AntMenu)`
  .ant-menu-submenu-popup {
    min-width: 0 !important;

    .ant-menu {
      background: $white-color;
      box-shadow: -8px 4px 50px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      padding: 20px 15px;

      .ant-menu-title-content {
        a {
          @extend %flex-row-wrap;
          column-gap: 10px;

          &:hover {
            img {
              filter: invert(57%) sepia(52%) saturate(461%) hue-rotate(95deg) brightness(97%) contrast(99%);
            }
          }
        }
      }

      .ant-menu-item-selected {
        background: none;

        .ant-menu-title-content {
          a {
            @extend %flex-row-wrap;

            color: $green-color !important;
            column-gap: 10px;
          }

          &:hover {
            color: $green-color !important;
          }
        }
      }

      li {
        height: 25px;
        line-height: 25px;
        margin: 0;
        padding: 0;

        &:hover {
          background: none;
        }
      }
    }
  }

  .ant-menu-item a {
    &:hover {
      color: $green-color !important;
    }
  }

  .ant-menu-submenu-open {
    color: $green-color !important;
  }

  li {
    padding-left: 30px !important;

    .ant-menu-title-content {
      color: $grey-dark-color;

      a {
        color: $grey-dark-color;
      }
    }

    .ant-menu-submenu-title {
      @extend %align-items-center;

      &:hover {
        .ant-menu-title-content {
          color: $green-color !important;
        }

        img {
          filter: invert(57%) sepia(52%) saturate(461%) hue-rotate(95deg) brightness(97%) contrast(99%);
        }
      }
    }

    a {
      @extend %align-items-center;

      img {
        margin-right: 10px;
      }
    }

    &:hover {
      .ant-menu-title-content {
        a {
          color: $green-color !important;

          img {
            filter: invert(57%) sepia(52%) saturate(461%) hue-rotate(95deg) brightness(97%) contrast(99%);
          }
        }
      }
    }

    &::after {
      display: none !important;
    }
  }

  .ant-menu-item-selected {
    a {
      color: $green-color !important;

      img {
        filter: invert(57%) sepia(52%) saturate(461%) hue-rotate(95deg) brightness(97%) contrast(99%);
      }
    }
  }

  .ant-menu-submenu-selected {
    .ant-menu-title-content {
      color: $green-color !important;
    }

    img {
      filter: invert(57%) sepia(52%) saturate(461%) hue-rotate(95deg) brightness(97%) contrast(99%);
    }
  }

  .ant-menu-overflow-item {
    @extend %align-items-center;
  }
`;


