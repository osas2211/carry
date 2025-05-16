/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/contracts.json`.
 */
export type Contracts = {
  address: "9TYPgvadsErCiq1PiZ3Us9fY52eLFVhTHnZ9gZUNiEVT";
  metadata: {
    name: "contracts";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "assignDeliveryJob";
      discriminator: [146, 71, 217, 154, 114, 150, 74, 251];
      accounts: [
        {
          name: "creator";
          writable: true;
          signer: true;
        },
        {
          name: "delivery";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "creator";
              },
              {
                kind: "arg";
                path: "index";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "index";
          type: "u64";
        },
        {
          name: "courier";
          type: "pubkey";
        }
      ];
    },
    {
      name: "confirmDelivery";
      discriminator: [11, 109, 227, 53, 179, 190, 88, 155];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "delivery";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "signer";
              },
              {
                kind: "arg";
                path: "index";
              }
            ];
          };
        },
        {
          name: "escrow";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [101, 115, 99, 114, 111, 119];
              },
              {
                kind: "account";
                path: "signer";
              },
              {
                kind: "arg";
                path: "index";
              }
            ];
          };
        },
        {
          name: "courierAccount";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "index";
          type: "u64";
        }
      ];
    },
    {
      name: "createDelivery";
      discriminator: [68, 31, 6, 31, 5, 49, 46, 62];
      accounts: [
        {
          name: "delivery";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "creator";
              },
              {
                kind: "arg";
                path: "index";
              }
            ];
          };
        },
        {
          name: "creator";
          writable: true;
          signer: true;
        },
        {
          name: "escrow";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [101, 115, 99, 114, 111, 119];
              },
              {
                kind: "account";
                path: "creator";
              },
              {
                kind: "arg";
                path: "index";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "index";
          type: "u64";
        },
        {
          name: "reward";
          type: "u64";
        },
        {
          name: "eta";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "delivery";
      discriminator: [121, 32, 31, 112, 7, 74, 193, 19];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "jobNotAvailable";
      msg: "This Delivery Job is no longer available";
    },
    {
      code: 6001;
      name: "jobNotAcceptedYet";
      msg: "This Delivery Job has not been accepted by a courier yet";
    },
    {
      code: 6002;
      name: "creatorAcceptJobBlocked";
      msg: "Creator can't be courier";
    },
    {
      code: 6003;
      name: "noCourierAssigned";
      msg: "No courier has been assigned.";
    },
    {
      code: 6004;
      name: "invalidCourierAccount";
      msg: "The provided courier account does not match the assigned courier.";
    },
    {
      code: 6005;
      name: "jobBlocked";
      msg: "The Job is already assigned";
    }
  ];
  types: [
    {
      name: "delivery";
      type: {
        kind: "struct";
        fields: [
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "courier";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "status";
            type: "string";
          },
          {
            name: "reward";
            type: "u64";
          },
          {
            name: "index";
            type: "u64";
          },
          {
            name: "metadataHash";
            type: {
              option: "string";
            };
          },
          {
            name: "createdAt";
            type: "u64";
          },
          {
            name: "estimatedTimeOfArrival";
            type: "u64";
          },
          {
            name: "escrow";
            type: "pubkey";
          }
        ];
      };
    }
  ];
};
