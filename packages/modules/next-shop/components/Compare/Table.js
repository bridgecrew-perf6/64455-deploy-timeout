import ProductSmall from '@shop/components/Product/Small';

const CompareTable = () => (
  <table className="uk-table uk-table-divider tm-compare-table">
    <thead>
      <tr className="uk-child-width-1-4">
        <td className="uk-table-middle uk-text-center tm-compare-column">
          <input className="tm-checkbox" id="show-difference" type="checkbox" />
          <label htmlFor="show-difference">Show differences only</label>
        </td>
        <td className="tm-compare-table-column">
          <div className="uk-height-1-1">
            <div
              className="uk-grid-small uk-child-width-1-1 uk-height-1-1"
              uk-grid="true"
            >
              <div className="uk-text-center">
                <a className="uk-text-small uk-text-danger" href="#">
                  <span uk-icon="icon: close; ratio: .75;" />
                  <span className="uk-margin-xsmall-left tm-pseudo">
                    Delete
                  </span>
                </a>
              </div>
              <div>
                <ProductSmall />
              </div>
            </div>
          </div>
        </td>
        <td className="tm-compare-table-column">
          <div className="uk-height-1-1">
            <div
              className="uk-grid-small uk-child-width-1-1 uk-height-1-1"
              uk-grid="true"
            >
              <div className="uk-text-center">
                <a className="uk-text-small uk-text-danger" href="#">
                  <span uk-icon="icon: close; ratio: .75;" />
                  <span className="uk-margin-xsmall-left tm-pseudo">
                    Delete
                  </span>
                </a>
              </div>
              <div>
                <ProductSmall />
              </div>
            </div>
          </div>
        </td>
        <td className="tm-compare-table-column">
          <div className="uk-height-1-1">
            <div
              className="uk-grid-small uk-child-width-1-1 uk-height-1-1"
              uk-grid="true"
            >
              <div className="uk-text-center">
                <a className="uk-text-small uk-text-danger" href="#">
                  <span uk-icon="icon: close; ratio: .75;" />
                  <span className="uk-margin-xsmall-left tm-pseudo">
                    Delete
                  </span>
                </a>
              </div>
              <div>
                <ProductSmall />
              </div>
            </div>
          </div>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th colSpan={4}>
          <h3 className="uk-margin-remove">Performance</h3>
        </th>
      </tr>
      <tr>
        <th>Processor</th>
        <td>Intel Core i7 Quad-Core</td>
        <td>Intel Core i5 Dual-Core</td>
        <td>Intel Core i5 Dual-Core</td>
      </tr>
      <tr>
        <th>Base Clock Speed</th>
        <td>2.8 GHz</td>
        <td>1.3 GHz</td>
        <td>1.8 GHz</td>
      </tr>
      <tr>
        <th>Maximum Boost Speed</th>
        <td>3.8 GHz</td>
        <td>3.2 GHz</td>
        <td>2.9 GHz</td>
      </tr>
      <tr>
        <th>Total Installed Memory</th>
        <td>16 GB</td>
        <td>8 GB</td>
        <td>8 GB</td>
      </tr>
      <tr>
        <th>Memory Type</th>
        <td>LPDDR3 SDRAM</td>
        <td>LPDDR3 SDRAM</td>
        <td>LPDDR3 SDRAM</td>
      </tr>
      <tr>
        <th>Memory Speed</th>
        <td>2133 MHz</td>
        <td>1866 MHz</td>
        <td>1600 MHz</td>
      </tr>
      <tr>
        <th>Onboard Memory</th>
        <td>16 GB</td>
        <td>8 GB</td>
        <td>8 GB</td>
      </tr>
      <tr>
        <th>Available Memory Slots</th>
        <td>—</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <th>Graphics Type</th>
        <td>Hybrid</td>
        <td>Integrated</td>
        <td>Integrated</td>
      </tr>
      <tr>
        <th>GPU</th>
        <td>
          AMD Radeon Pro 555 with 2 GB GDDR5 VRAM,
          <br />
          Intel HD Graphics 630
        </td>
        <td>Intel HD Graphics 615</td>
        <td>Intel HD Graphics 6000</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th colSpan={4}>
          <h3 className="uk-margin-remove">Display</h3>
        </th>
      </tr>
      <tr>
        <th>Graphics Type</th>
        <td>IPS</td>
        <td>IPS</td>
        <td>Not specified</td>
      </tr>
      <tr>
        <th>Size</th>
        <td>15.4"</td>
        <td>12"</td>
        <td>13.3"</td>
      </tr>
      <tr>
        <th>Aspect Ratio</th>
        <td>16:10</td>
        <td>16:10</td>
        <td>16:10</td>
      </tr>
      <tr>
        <th>Native Resolution</th>
        <td>2880×1800</td>
        <td>2304×1440</td>
        <td>1440×900</td>
      </tr>
      <tr>
        <th>Touchscreen</th>
        <td>—</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <th>Finish</th>
        <td>Glossy</td>
        <td>Glossy</td>
        <td>Glossy</td>
      </tr>
      <tr>
        <th>Brightness</th>
        <td>
          500 cd/m<sup>2</sup>
        </td>
        <td>Not specified</td>
        <td>Not specified</td>
      </tr>
      <tr>
        <th>Viewing Angle</th>
        <td>Not specified</td>
        <td>Not specified</td>
        <td>Not specified</td>
      </tr>
      <tr>
        <th>Refresh Rate</th>
        <td>Not specified</td>
        <td>Not specified</td>
        <td>Not specified</td>
      </tr>
      <tr>
        <th>Response Time</th>
        <td>Not specified</td>
        <td>Not specified</td>
        <td>Not specified</td>
      </tr>
      <tr>
        <th>Adaptive Sync Technology</th>
        <td>Not specified</td>
        <td>Not specified</td>
        <td>Not specified</td>
      </tr>
      <tr>
        <th>External Resolution</th>
        <td>Not specified</td>
        <td>Not specified</td>
        <td>Not specified</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th colSpan={4}>
          <h3 className="uk-margin-remove">Drives</h3>
        </th>
      </tr>
      <tr>
        <th>Available Slots</th>
        <td>—</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <th>Total Capacity</th>
        <td>256 GB</td>
        <td>512 GB</td>
        <td>128 GB</td>
      </tr>
      <tr>
        <th>Solid State Storage</th>
        <td>1 × 256 GB Integrated PCIe</td>
        <td>1 × 512 GB Integrated PCIe</td>
        <td>1 × 128 GB Integrated PCIe</td>
      </tr>
      <tr>
        <th>Optical Drive</th>
        <td>—</td>
        <td>—</td>
        <td>—</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th colSpan={4}>
          <h3 className="uk-margin-remove">Input/ Output Connectors</h3>
        </th>
      </tr>
      <tr>
        <th>Ports</th>
        <td>4 × Thunderbolt 3 via USB Type-C</td>
        <td>1 × USB 3.1 Gen 1 Type-C</td>
        <td>
          2 × USB 3.1 Gen 1 Type-A,
          <br />1 × Thunderbolt 2
        </td>
      </tr>
      <tr>
        <th>Display</th>
        <td>4 × DisplayPort via Type-C</td>
        <td>
          1 × DisplayPort 1.2 via Optional Cable,
          <br />1 × HDMI via Optional Cable,
          <br />1 × VGA via Optional Cable
        </td>
        <td>1 × Mini DisplayPort via Thunderbolt Port</td>
      </tr>
      <tr>
        <th>Audio</th>
        <td>
          1 × 1/8" (3.5 mm) Headphone Output,
          <br />2 × Integrated Speaker,
          <br />3 × Integrated Microphone
        </td>
        <td>
          1 × 1/8" (3.5 mm) Headphone Output,
          <br />2 × Integrated Speaker,
          <br />2 × Integrated Microphone
        </td>
        <td>
          1 × 1/8" (3.5 mm) Headphone Output,
          <br />2 × Integrated Speaker,
          <br />2 × Integrated Microphone
        </td>
      </tr>
      <tr>
        <th>Expansion Slots</th>
        <td>—</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <th>Media Card Slots</th>
        <td>—</td>
        <td>—</td>
        <td>SD/SDHC/SDXC</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th colSpan={4}>
          <h3 className="uk-margin-remove">Communications</h3>
        </th>
      </tr>
      <tr>
        <th>Network</th>
        <td>—</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <th>Modem</th>
        <td>—</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <th>Wi-Fi</th>
        <td>802.11ac; Dual-Band</td>
        <td>802.11ac; Dual-Band</td>
        <td>802.11ac; Dual-Band</td>
      </tr>
      <tr>
        <th>Bluetooth</th>
        <td>Bluetooth 4.2</td>
        <td>Bluetooth 4.2</td>
        <td>Bluetooth 4.0</td>
      </tr>
      <tr>
        <th>Mobile Broadband</th>
        <td>—</td>
        <td>—</td>
        <td>—</td>
      </tr>
      <tr>
        <th>GPS</th>
        <td>Not specified</td>
        <td>—</td>
        <td>Not specified</td>
      </tr>
      <tr>
        <th>NFC</th>
        <td>Not specified</td>
        <td>—</td>
        <td>Not specified</td>
      </tr>
      <tr>
        <th>Webcam</th>
        <td>User-Facing: 720p Video</td>
        <td>User-Facing: 480p Video</td>
        <td>User-Facing: 720p Video</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th colSpan={4}>
          <h3 className="uk-margin-remove">Battery</h3>
        </th>
      </tr>
      <tr>
        <th>Battery Chemistry</th>
        <td>Lithium-Ion Polymer</td>
        <td>Lithium-Ion Polymer</td>
        <td>Lithium-Ion Polymer</td>
      </tr>
      <tr>
        <th>Watt Hours / Type</th>
        <td>76 Wh Non-Removable</td>
        <td>41.4 Wh Non-Removable</td>
        <td>54 Wh Non-Removable</td>
      </tr>
      <tr>
        <th>Cells</th>
        <td>Not specified</td>
        <td>Not specified</td>
        <td>Not specified</td>
      </tr>
      <tr>
        <th>Output Voltage</th>
        <td>Not specified</td>
        <td>Not specified</td>
        <td>Not specified</td>
      </tr>
      <tr>
        <th>Maximum Runtime</th>
        <td>10 Hours</td>
        <td>10 Hours</td>
        <td>12 Hours</td>
      </tr>
      <tr>
        <th>Power Requirements</th>
        <td>100-240 VAC, 50-60 Hz</td>
        <td>100-240 VAC, 50-60 Hz</td>
        <td>100-240 VAC, 50-60 Hz</td>
      </tr>
      <tr>
        <th>Power Supply</th>
        <td>1 × 87 W</td>
        <td>1 × 29 W</td>
        <td>1 × 45 W</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th colSpan={4}>
          <h3 className="uk-margin-remove">General</h3>
        </th>
      </tr>
      <tr>
        <th>Operating System</th>
        <td>macOS High Sierra</td>
        <td>macOS High Sierra</td>
        <td>macOS High Sierra</td>
      </tr>
      <tr>
        <th>Security</th>
        <td>Not specified</td>
        <td>Not specified</td>
        <td>Not specified</td>
      </tr>
      <tr>
        <th>Keyboard</th>
        <td>
          Keys: 64,
          <br />
          Type: Standard Notebook Keyboard,
          <br />
          Features: Backlight
        </td>
        <td>
          Keys: 78,
          <br />
          Type: Standard Notebook Keyboard,
          <br />
          Features: Backlight
        </td>
        <td>
          Keys: 78,
          <br />
          Type: Standard Notebook Keyboard,
          <br />
          Features: Backlight
        </td>
      </tr>
      <tr>
        <th>Pointing Device</th>
        <td>Force Touch Trackpad</td>
        <td>Force Touch Trackpad</td>
        <td>TouchPad</td>
      </tr>
      <tr>
        <th>Dimensions (W × H × D)</th>
        <td>13.8 × 0.6 × 9.5" / 35.1 × 1.5 × 24.1 cm</td>
        <td>11.0 × 0.5 × 7.7" / 27.9 × 1.3 × 19.6 cm</td>
        <td>12.8 × 0.7 × 8.9" / 32.5 × 1.8 × 22.6 cm</td>
      </tr>
      <tr>
        <th>Weight</th>
        <td>4.02 lb / 1.82 kg</td>
        <td>2.03 lb / .92 kg</td>
        <td>2.96 lb / 1.34 kg</td>
      </tr>
      <tr>
        <th>Warranty Length</th>
        <td>Limited 1-Year Warranty</td>
        <td>Limited 1-Year Warranty</td>
        <td>Limited 1-Year Warranty</td>
      </tr>
    </tbody>
  </table>
);

export default CompareTable;
