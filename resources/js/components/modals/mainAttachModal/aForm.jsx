import React, { useState } from "react";

export const AForm = ({ confirmSelect, frPrice, modalOpen, closeModal }) => {
    const [modalChecked, setModalChecked] = useState("");
    const handleModalRadio = e => {
        //console.log("target value" + e.target.value);
        setModalChecked(e.target.value);
    };
    return (
        <div className="form-group">
            <p className="rmodal_header ml-2 mt-2">
                Please choose one of the fllowings with the main food:
            </p>

            <div>
                <label className="ml-4">
                    Chips:
                    <span className=" ml-1 font-italic text-success">Free</span>
                    <br />
                    <input
                        type="radio"
                        id="chips"
                        name="mainAttach"
                        value="chips"
                        checked={modalChecked == "chips"}
                        onChange={handleModalRadio}
                    />
                </label>
                <label className="ml-3 font-weigh-bold">
                    Boiled Rice:
                    <span className="ml-1 font-italic text-success">Free</span>
                    <br />
                    <input
                        type="radio"
                        id="brice"
                        name="mainAttach"
                        value="brice"
                        checked={modalChecked == "brice"}
                        onChange={handleModalRadio}
                    />
                </label>
                <label className="ml-4">
                    Fried Rice:
                    <span className="ml-1">{frPrice} Euro</span>
                    <br />
                    <input
                        type="radio"
                        id="frice"
                        name="mainAttach"
                        value="frice"
                        checked={modalChecked == "frice"}
                        onChange={handleModalRadio}
                    />
                </label>
            </div>
            <br />
            <div className="mb-2 row">
                <button
                    onClick={closeModal}
                    className=" btn btn-secondary"
                    //type="submit"
                >
                    Choose none
                </button>
                <button
                    onClick={() => confirmSelect(modalChecked, modalOpen)}
                    className="btn btn-primary ml-3"
                    //type="submit"
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};
export default AForm;
